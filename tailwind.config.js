module.exports = {
    content: ["./**/*.html", "./content/**/*.md"],
    theme: {
      extend: {
        fontFamily: {
          'mono-regular': 'IBM Plex Mono Regular',
          'mono-italic': 'IBM Plex Mono Italic',
        },
        colors: {
          'darkbg': '#0E1724',
          'theme1bg': 'rgb(196,46,96)',
          'theme2bg': 'rgb(34,91,126)',
          'theme3bg': 'rgb(76,135,133)',
          'theme4bg': 'rgb(211,156,73)',
          'theme5bg': 'rgb(230,82,68)',
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
}