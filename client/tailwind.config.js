module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        magic: [
          'Cinzel',
          'UnifrakturCook',
          'serif',
        ],

      },
      colors: {
        mtgDark: '#2a2323', // tom escuro, quase preto, para "dark fantasy"
        mtgGold: '#bfa76a', // dourado envelhecido
      },
      
      // 2) as tuas animações personalizadas
      keyframes: {
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        glow: {
          '0%': { filter: 'blur(8px) hue-rotate(0deg)', opacity: '0.4' },
          '50%': { filter: 'blur(16px) hue-rotate(90deg)', opacity: '0.8' },
          '100%': { filter: 'blur(8px) hue-rotate(180deg)', opacity: '0.4' },
        },
      },

      // 3) liga os keyframes a nomes de animação
      animation: {
        'gradient-x': 'gradientX 5s ease infinite',
        'svg-glow': 'glow 4s ease-in-out infinite',
      },

      // 4) qualquer outro extend que já tinhas…
    },
  },
  plugins: [],
};
