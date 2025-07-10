import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import mtg_logo_monocolor from "../images/mtg_logo_monocolor.svg";

const MtgLogo = () => (
  <img
    src={mtg_logo_monocolor}
    alt="MtG Deck Builder Logo"
    className="h-10 w-auto drop-shadow-[0_0px_4px_rgba(255,0,0,0.60)]"
  />
);

export default function NavBarHome() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      maxWidth="full"
      className="bg-black/80 text-white backdrop-blur-sm border-b border-gray-700"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      {/* Left side: Hamburger + Logo */}
      <NavbarContent className="flex-1">
        {" "}
        {/* flex-1 para ocupar espaço à esquerda */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand className="flex items-center gap-2">
          <MtgLogo />
          <p className="font-bold text-inherit">Magic Deck Builder</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Center menu links - hidden on mobile */}
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link
            className="font-bold text-white hover:text-red-500 transition-colors duration-200"
            color="foreground"
            href="#"
          >
            Search
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="font-bold text-white hover:text-red-500 transition-colors duration-200"
            aria-current="page"
            href="#"
          >
            Decks
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={() => navigate("/graficos")}
            className="font-bold text-white hover:text-red-500 transition-colors duration-200"
            color="foreground"
          >
            Graphs
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Right side login/signup buttons */}
      <NavbarContent className="flex-1 justify-end">
        {" "}
        {/* flex-1 + justify-end empurra para direita */}
        <NavbarItem>
          <Button
            variant="light"
            color="default"
            className="flex m-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-red-700 hover:scale-105 hover:text-white transition duration-300 font-medium shadow-lg"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            className="flex px-5 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition font-medium shadow"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="sm:hidden z-50 bg-black/90 text-white">

        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
