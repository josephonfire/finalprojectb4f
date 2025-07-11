import React from "react";

// Caminho base para os ícones SVG
const ICON_PATH = "/images/mtg_icons"; // relativo à pasta public

// Mapeamento de símbolos para nomes de ficheiros
const symbolMap = {
  "{T}": "T.svg",
  "{G}": "G.svg",
  "{R}": "R.svg",
  "{U}": "U.svg",
  "{B}": "B.svg",
  "{W}": "W.svg",
  "{C}": "C.svg",
  "{X}": "X.svg",
  "{0}": "0.svg",
  "{1}": "1.svg",
  "{2}": "2.svg",
  "{3}": "3.svg",
  "{4}": "4.svg",
  "{5}": "5.svg",
  "{6}": "6.svg",
  "{7}": "7.svg",
  "{8}": "8.svg",
  "{9}": "9.svg",
  "{10}": "10.svg",
  "{11}": "11.svg",
  "{12}": "12.svg",
  "{13}": "13.svg",
  "{14}": "14.svg",
  "{15}": "15.svg",
  "{16}": "16.svg",
  "{17}": "17.svg",
  "{18}": "18.svg",
  "{19}": "19.svg",
  "{20}": "20.svg",
  // Adiciona mais conforme necessário
};

export function replaceManaSymbols(text) {
  if (!text) return null;

  const parts = text.split(/(\{[^}]+\})/g); // divide por símbolos como {T}, {G}, etc.

  return parts.map((part, index) => {
    if (symbolMap[part]) {
      return (
        <img
          key={index}
          src={`${ICON_PATH}/${symbolMap[part]}`}
          alt={part}
          className="inline w-5 h-5 mx-0.5 align-text-bottom"
        />
      );
    } else {
      return <React.Fragment key={index}>{part}</React.Fragment>;
    }
  });
}