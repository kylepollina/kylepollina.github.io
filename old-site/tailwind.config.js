module.exports = {
    content: ["./**/*.html", "./content/**/*.md"],
    theme: {
      extend: {
        fontFamily: {
          'mono-regular': 'IBM Plex Mono Regular',
          'mono-italic': 'IBM Plex Mono Italic',
          'serif-regular': 'IBM Plex Serif Regular',
          'serif-italic': 'IBM Plex Serif Italic',
        },
        colors: {
          'darkbg': '#0E1724',
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
}