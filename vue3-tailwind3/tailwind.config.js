const defaults = require('tailwindcss/defaultTheme');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  theme: {

    extend: {
      container: {
        center: true,
        padding: '0',
      },
      colors: {
        'current': "currentColor",
        'transparent': "transparent",
      },
    },
  },

  content: ['./*.php', './includes/**/*.php', './templates/**/*.php', './src/**/*.{js,ts,vue}'],
};
