/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#FBB03B",
        "sub-main-color": "#FBB03C",
        "sub-black": "#3C3A36",
        "sub-red": "#FF0000",
        "sub-gray": "#707070",
        "title-box": "#EAEAEA",
      },
    },
  },
  plugins: [],
};
