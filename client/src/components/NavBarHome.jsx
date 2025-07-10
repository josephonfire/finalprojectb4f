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
    className="h-14 w-auto drop-shadow-[0_0px_4px_rgba(255,0,0,0.60)]"
  />
);

export default function NavBarHome() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Profile", path: "/profile" },
    { label: "Dashboard", path: "#" },
    { label: "Analytics", path: "#" },
    { label: "My Settings", path: "#" },
    { label: "Help & Feedback", path: "#" },
    { label: "Log Out", path: "#" },
  ];

  return (
    <>
      <Navbar
        maxWidth="full"
        className="fixed bg-black/90 text-white backdrop-blur-sm border-b border-gray-700"
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      >
        {/* Left: Logo + Menu Toggle */}
        <NavbarContent className="flex-1">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-red-500 transition-colors duration-200 font-bold text-lg"
          >
            Menu
          </button>
          <NavbarBrand className="flex items-center gap-2">
            <MtgLogo />
            <p className="font-bold text-inherit">Magic Deck Builder</p>
          </NavbarBrand>
        </NavbarContent>

        {/* Center Links */}
        <NavbarContent className="hidden sm:flex gap-4">
          <NavbarItem>
            <Button
              onClick={() => navigate("/")}
              className="font-bold text-white hover:text-red-500 transition-colors"
              variant="light"
            >
              Home
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="font-bold text-white hover:text-red-500 transition-colors"
              href="#"
            >
              Decks
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              onClick={() => navigate("/graficos")}
              className="font-bold text-white hover:text-red-500 transition-colors"
              variant="light"
            >
              Graphs
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Right: Auth Buttons */}
        <NavbarContent className="flex-1 justify-end">
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

        {/* Sidebar Menu */}
        <NavbarMenu className="fixed top-0 left-0 w-64 h-full z-50 bg-black text-white p-6 transition-transform transform duration-300 ease-in-out shadow-xl border-r border-red-700 sm:w-72">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-red-500">Menu</h2>
          </div>

          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index} className="mb-2">
              <Link
                className={`block w-full text-lg font-medium transition-colors ${
                  item.label === "Log Out"
                    ? "text-red-500 hover:text-red-700"
                    : "text-white hover:text-red-500"
                }`}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* 🔳 Overlay para fechar o menu clicando fora */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
