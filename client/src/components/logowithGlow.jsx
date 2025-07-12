import React from "react";
import mtg_logo_duocolor from "../images/mtg_logo_duocolor.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import "../index.css";


export default function LogoWithGlow() {
  return (
    <div className="relative inline-block w-56 sm:w-64 md:w-72">
      {/* Glow atrás do SVG */}
      <img
        src={mtg_logo_duocolor}
        aria-hidden="true"
        alt="MtG Deck Builder Logo Glow"
        className="absolute inset-0 w-full h-full filter blur-lg opacity-50 animate-svg-glow"
      />
      {/* Logo real por cima */}
      <img
        src={mtg_logo_duocolor}
        alt="MtG Deck Builder Logo"
        className="relative block w-full h-auto"
      />
    </div>
  );
}