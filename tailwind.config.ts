/** @type {import('tailwindcss').Config} */

import flowbitPlugin from "flowbite/plugin";

const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [flowbitPlugin],

  darkMode: "selector",

  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#70af78",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d",
        },
        gray: {
          "700": "#333",
          "800": "#333"
        }
      },
    },
  },
};

export default config;
