/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {main: ["Nunito Sans", "sans-serif"]},
      height: {
        custom: 'calc(100vh - 8rem)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "dark",],
  },
}

