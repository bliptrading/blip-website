/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "my-image":
          "url('https://img.freepik.com/free-photo/present-toy-shopping-cart_23-2148015372.jpg?t=st=1726594818~exp=1726598418~hmac=8a1a78577f46bac7a0417830d9a63074c5fdd4e01b69aad250ce88a84931f745&w=740')",
        "banner-image":
          "url('https://img.freepik.com/free-photo/present-toy-shopping-cart_23-2148015372.jpg?t=st=1726594818~exp=1726598418~hmac=8a1a78577f46bac7a0417830d9a63074c5fdd4e01b69aad250ce88a84931f745&w=740')",

          "section-image":"url('./assets/you2.png')"
      },
      height: {
        "80vh": "80vh",
      },
      fontFamily: {
        roboto: ["robot", "serif"],
        rubik: ["rubink", "serif"],
      },
      keyframes: {
        verticalBounce: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        verticalBounce: "verticalBounce 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light", // name of one of the included themes for dark mode
  },
};
