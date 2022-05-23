module.exports = {
  content: ['./*.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
