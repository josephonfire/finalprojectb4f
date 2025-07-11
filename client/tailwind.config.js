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
    },
  },
  plugins: [],
};