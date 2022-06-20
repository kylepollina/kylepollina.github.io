module.exports = {
    content: ["./**/*.html", "./content/**/*.md"],
    theme: {
      extend: {
        colors: {
          'darkred': '#CE2029',
          'lightblue': 'rgb(102,172,228)',
          'myblue': 'rgb(40,122,177)',

          // 'theme1fg': 'white',
          // 'theme1bg': 'rgb(205,55,106)',
          // 'theme2fg': 'white',
          // 'theme2bg': 'rgb(61,51,75)',
          // 'theme3fg': 'rgb(252,234,207)',
          // 'theme3bg': 'rgb(156,192,178)',
          // 'theme4fg': 'rgb(205,55,106)',
          // 'theme4bg': 'rgb(252,234,207)',
          // 'theme5fg': 'rgb(252,234,207)',
          // 'theme5bg': 'rgb(242,157,105)',

          'theme1fg': 'white',
          'theme1bg': 'rgb(196,46,96)',
          'theme2fg': 'white',
          'theme2bg': 'rgb(34,91,126)',
          'theme3fg': 'white',
          'theme3bg': 'rgb(76,135,133)',
          'theme4fg': 'white',
          'theme4bg': 'rgb(211,156,73)',
          'theme5fg': 'white',
          'theme5bg': 'rgb(230,82,68)',

        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
}