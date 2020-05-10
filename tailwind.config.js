module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#24d1f8',
          dark: '#1b96b4',
        },
        stats: {
          high: '#89f5a2',
          medium: '#ffed68',
          low: '#f17d59',
          avg: '#dcdcdc',
          default: '#007bff',
        },
        grays: {
          light: '#343a40',
          medium: '#313131',
          dark: '#1d1d1d',
        },
        table: {
          border: '#32383e',
          row1: 'rgba(255,255,255,.05)',
          row2: 'rgb(33, 37, 41)',
        },
      },
      fontSize: {
        xxs: '0.5rem',
      },
      inset: {
        '100': '100%',
      },
      flexGrow: {
        '2': 2,
      },
      minHeight: {
        '16': '4rem',
      },
    },
  },
  variants: {
    borderStyle: ['responsive', 'hover'],
    borderWidth: ['responsive', 'hover'],
    margin: ['responsive', 'first', 'last'],
    padding: ['responsive', 'first', 'last'],
    cursor: ['responsive', 'hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'odd', 'even'],
  },
  plugins: [],
};
