module.exports = {
    content: ["./**/*.html", "./content/**/*.md"],
    theme: {
      extend: {
        colors: {
          'darkred': '#CE2029',
          'lightblue': 'rgb(102,172,228)'
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
}