import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./chatPages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      inter: "Inter",
    },
    backgroundColor: {
      secondry: "#312F2F",
      primary: "#1F1D1D",
      third: "#312F2F",
      hover: "#7C39E6",
    },
    colors: {
      hover: "#7C39E6",
      active: "#21ff5ffc",
    },
    borderColor: {
      primary: "#7C39E6",
    },
    borderRadius: {
      primary: "10px",
      secondary: "30px",
    },
    fontSize: {
      para: "12px",
      heading: "20px",
    },
    boxShadow: {
      form: "18px 12px 145px 27px rgba(158,131,201,0.79) inset",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
