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

  content: ['./*.php', './includes/**/*.php', './templates/**/*.php', './src/**/*.{js,ts,vue}'],
};
