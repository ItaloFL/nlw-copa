/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        app: 'url(/BG-effects.png)'
      },
      
      colors: {
        green: {
          550: '#129E57'
        },

        yellow: {
          550: "#f7dd43",
          750: "#e5cd3d"
        },

        gray: {
          100: '#e1e1e6',
          300: '#8d8d99',
          600: '#323238',
          800: '#202024',
          900: '#121214'
        }
      }
    }
  },
  plugins: []
}
