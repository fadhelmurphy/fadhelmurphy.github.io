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
