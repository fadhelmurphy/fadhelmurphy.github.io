module.exports = {
  // content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./containers/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "rotate( 0.0deg)" },
          "10%": { transform: "rotate(14.0deg)" },  /* The following five values can be played with to make the waving more or less extreme */
          "20%": { transform: "rotate(-8.0deg)" },
          "30%": { transform: "rotate(14.0deg)" },
          "40%": { transform: "rotate(-4.0deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate( 0.0deg)" },  /* Reset for the last half to pause */
         "100%": { transform: "rotate( 0.0deg)" },
        }
      },
      animation: {
        'waving-hand': 'wave 2.5s linear infinite',
      },
      colors: {
        base: "#2e3e6a",
        "base-2": "#617fad",
      },
      backgroundImage: {
        "edu-section":
          "radial-gradient(188% 222% at 116% 50%, #ff47bd 0%, rgba(253, 119, 2, 0.2) 13%, rgba(255,255,255,0) 19%)",
        "edu-orange":
          "linear-gradient(289deg, rgba(253, 119, 2, 1) 0%, rgba(255, 187, 0, 1) 100%)",
          "white-vertical-gradient":
            "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,1) 100%)",
      },
    },
    fontFamily: {
      header: ["Poppins", "ui-sans-serif"],
    },
    container: {
      center: true,
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        // ".porto-card": {
        //   borderRadius: "20px",
        //   background: "#fff",
        //   mask: "linear-gradient(345deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 35%)",
        //   transition: "all 0.5s ease 0s"
        // },
        ".radial-white-gradient-bg": {
          background:
            "radial-gradient(45% 45% at center,rgba(255,255,255,0.6) 0%,rgba(255,255,255,1) 100%)",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
        },
        ".pattern": {
          /* background: radial-gradient(#2e3e6a 1px, #fff 1px); */
          background:
            "linear-gradient(#2e3e6a 1px, transparent 1px), linear-gradient(to right, #2e3e6a 1px, rgb(229, 229, 247) 1px)",
          backgroundSize: "80px 80px",
          /* background-size: 20px 20px; */
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
        },
        ".text-shadow-white": {
          filter:
            "drop-shadow(0 0 20px #fff) drop-shadow(0 0 20px #fff) drop-shadow(0 0 20px #fff) drop-shadow(0 0 20px #fff)",
        },
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "1280px",
          },
        },
      });
    },
  ],
};
