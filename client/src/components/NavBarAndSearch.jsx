import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mtg_logo_monocolor from "../images/mtg_logo_monocolor.svg";
import SearchBarOnly from "./Search Bar/SearchBarOnly";
import { FaUserCircle, FaSignOutAlt, FaLayerGroup, FaQuestionCircle, FaBars, FaRegClone } from "react-icons/fa";

export default function NavBarAndSearch() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const hasValidUser = isLoggedIn && username && username !== "null" && username !== "undefined";

  const menuItems = [
    { label: "Cards", icon: <FaRegClone />, path: "/usercards" },
    { label: "Decks", icon: <FaLayerGroup />, path: "/userdecks" },
    { label: "Help", icon: <FaQuestionCircle />, path: "#" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsMenuOpen(false);
    setUserDropdown(false);
    navigate('/login');
  };

  const MtgLogo = () => (
    <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => navigate("/")}> 
      <img
        src={mtg_logo_monocolor}
        alt="MtG Deck Builder Logo"
        className="h-12 w-auto drop-shadow-[0_0px_4px_rgba(255,0,0,0.60)]"
      />
      <span className="text-2xl font-extrabold tracking-tight font-magic bg-gradient-to-r from-red-500 to-yellow-300 bg-clip-text text-transparent drop-shadow" style={{letterSpacing: '0.04em', textShadow: '0 1px 4px #000'}}>Magic Deck Builder</span>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 border-b-2 border-gray-700 shadow-lg shadow-red-900/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-3xl text-red-400 hover:text-red-500 transition-all duration-200 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
          <div className="hidden md:flex">
            <MtgLogo />
          </div>
          <span className="md:hidden font-bold text-lg text-red-200 ml-2">Magic Deck Builder</span>
        </div>

        {/* Center: Search bar (desktop) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-md">
            <SearchBarOnly />
          </div>
        </div>

        {/* Right: Auth/User */}
        <div className="flex items-center gap-2 relative">
        {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-red-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-black hover:text-white hover:scale-105 focus:bg-black focus:text-white focus:scale-105 transition duration-200 shadow border border-red-800"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-red-700 font-semibold px-5 py-2 rounded-lg hover:bg-red-700 hover:text-white hover:scale-105 focus:bg-red-700 focus:text-white focus:scale-105 transition duration-200 shadow border border-red-800"
              >
                Sign Up
              </button>
            </>
        )}
        {isLoggedIn && (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-white hover:text-black text-red-200 font-semibold shadow transition-all duration-200 focus:outline-none border border-red-900 focus:bg-white focus:text-black"
                onClick={() => setUserDropdown((v) => !v)}
              >
                <FaUserCircle className="text-2xl text-red-400" />
                <span className="hidden sm:inline">{username}</span>
              </button>
              {/* Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-black/95 border border-red-800 rounded-xl shadow-lg z-50 animate-fade-in">
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-200 hover:bg-white hover:text-black transition-colors duration-200 font-semibold rounded-t-xl"
                    onClick={() => navigate(`/profile/${username}`)}
                  >
                    <FaUserCircle /> Profile
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-200 hover:bg-white hover:text-black transition-colors duration-200 font-semibold"
                    onClick={() => navigate("/usercards")}
                  >
                    <FaRegClone /> Cards
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-200 hover:bg-white hover:text-black transition-colors duration-200 font-semibold"
                    onClick={() => navigate("/userdecks")}
                  >
                    <FaLayerGroup /> Decks
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-200 hover:bg-white hover:text-black transition-colors duration-200 font-semibold"
                    onClick={() => navigate("#")}
                  >
                    <FaQuestionCircle /> Help
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-white hover:text-black transition-colors duration-200 font-semibold rounded-b-xl"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
          </div>

      {/* Sidebar Menu (mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-[60] bg-black/95 text-red-200 p-6 shadow-2xl border-r-2 border-red-800 rounded-r-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-2 mb-8">
          <MtgLogo />
        </div>
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => { setIsMenuOpen(false); navigate(item.path); }}
            className="flex items-center gap-3 w-full text-lg font-semibold px-4 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 mb-2"
          >
            {item.icon} {item.label}
          </button>
        ))}
        {isLoggedIn && (
              <button
                onClick={handleLogout}
            className="flex items-center gap-3 w-full text-lg font-semibold px-4 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 mt-8 text-red-400"
              >
            <FaSignOutAlt /> Logout
              </button>
        )}
          </div>
      {/* Overlay for sidebar */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}
