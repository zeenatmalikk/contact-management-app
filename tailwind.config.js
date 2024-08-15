module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sage: "#018270",
        sageLight:"#3BAD9E",
        yellow:"#eab308",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
