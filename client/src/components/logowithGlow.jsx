import React from "react";
import { ReactComponent as LogoSVG } from "../images/mtg_logo_duocolor.svg";

export default function LogoWithGlow() {
  return (
    <div className="relative inline-block w-56 sm:w-64 md:w-72">
      {/* Define o filtro SVG invisível para o glow */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* SVG com classe para aplicar glow */}
      <LogoSVG className="w-full h-auto glow-stroke" />
    </div>
  );
}
