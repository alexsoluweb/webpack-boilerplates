const defaults = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      'current': "currentColor",
      'transparent': "transparent",
    },
    extend: {
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  content: ['./*.php', './includes/**/*.php', './page-templates/**/*.php', './templates/**/*.php', './src/**/*.{js,ts,vue,scss,css}'],
};
