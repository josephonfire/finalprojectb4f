import React from "react";
const ICON_PATH = "../images/mtg_icons/";

const symbolMap = [
    ['{0}', '0.svg'],
    ['{1}', '1.svg'],
    ['{2}', '2.svg'],
    ['{3}', '3.svg'],
    ['{4}', '4.svg'],
    ['{5}', '5.svg'],
    ['{6}', '6.svg'],
    ['{7}', '7.svg'],
    ['{8}', '8.svg'],
    ['{9}', '9.svg'],
    ['{10}', '10.svg'],
    ['{11}', '11.svg'],
    ['{12}', '12.svg'],
    ['{13}', '13.svg'],
    ['{14}', '14.svg'],
    ['{15}', '15.svg'],
    ['{16}', '16.svg'],
    ['{17}', '17.svg'],
    ['{18}', '18.svg'],
    ['{19}', '19.svg'],
    ['{20}', '20.svg'],
    ['{W}', 'W.svg'],
    ['{U}', 'U.svg'],
    ['{B}', 'B.svg'],
    ['{R}', 'R.svg'],
    ['{G}', 'G.svg'],
    ['{C}', 'C.svg'],
    ['{S}', 'S.svg'],
    ['{X}', 'X.svg'],
    ['{Y}', 'Y.svg'],
    ['{T}', 'T.svg'],
    ['{Q}', 'Q.svg'],
    ['{2/W}', '2W.svg'],
    ['{2/U}', '2U.svg'],
    ['{2/B}', '2B.svg'],
    ['{2/R}', '2R.svg'],
    ['{2/G}', '2G.svg'],
    ['{W/U}', 'WU.svg'],
    ['{W/B}', 'WB.svg'],
    ['{U/B}', 'UB.svg'],
    ['{U/R}', 'UR.svg'],
    ['{B/R}', 'BR.svg'],
    ['{B/G}', 'BG.svg'],
    ['{R/G}', 'RG.svg'],
    ['{R/W}', 'RW.svg'],
    ['{G/W}', 'GW.svg'],
    ['{G/U}', 'GU.svg'],
    ['{W/P}', 'WP.svg'],
    ['{U/P}', 'UP.svg'],
    ['{B/P}', 'BP.svg'],
    ['{R/P}', 'RP.svg'],
    ['{G/P}', 'GP.svg'],
    ['{C/B}', 'CB.svg'],
    ['{C/G}', 'CG.svg'],
    ['{C/R}', 'CR.svg'],
    ['{C/U}', 'CU.svg'],
    ['{C/W}', 'CW.svg'],
    ['{B/G/P}', 'BGP.svg'],
    ['{B/R/P}', 'BRP.svg'],
    ['{G/U/P}', 'GUP.svg'],
    ['{G/W/P}', 'GWP.svg'],
    ['{R/G/P}', 'RGP.svg'],
    ['{R/W/P}', 'RWP.svg'],
    ['{U/B/P}', 'UBP.svg'],
    ['{U/R/P}', 'URP.svg'],
    ['{W/B/P}', 'WBP.svg'],
    ['{W/U/P}', 'WUP.svg']
];

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
