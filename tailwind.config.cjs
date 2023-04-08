module.exports = {
	// content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./containers/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
    theme: {
        extend: {
          colors: {
          'base': '#2e3e6a',
          'base-2': '#617fad',
        },
        backgroundImage: {
           'edu-section': "radial-gradient(188% 222% at 116% 50%, #ff47bd 0%, rgba(253, 119, 2, 0.2) 13%, rgba(255,255,255,0) 19%)",
           'edu-orange': "linear-gradient(289deg, rgba(253, 119, 2, 1) 0%, rgba(255, 187, 0, 1) 100%)"
        },
      },
      fontFamily: {
        'header': ['Poppins', 'ui-sans-serif'],
      },
      container: {
        center: true,
      },
    },
    corePlugins: {
      container: false
    },
    plugins: [
      function ({ addComponents }) {
        addComponents({
          '.container': {
            maxWidth: '100%',
            '@screen sm': {
              maxWidth: '640px',
            },
            '@screen md': {
              maxWidth: '768px',
            },
            '@screen lg': {
              maxWidth: '1280px',
            },
          }
        })
      }
    ]
};
