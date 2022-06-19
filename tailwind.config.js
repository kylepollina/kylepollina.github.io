module.exports = {
    content: ["./**/*.html", "./content/**/*.md"],
    theme: {
      extend: {
        colors: {
          'darkred': '#CE2029',
          'lightblue': 'rgb(102,172,228)',
          'myblue': 'rgb(40,122,177)'
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
}