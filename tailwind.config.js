export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F0', paper: '#FFFDF9', crema: '#EFE4D6',
        espresso: { DEFAULT: '#3B2418', soft: '#5A3D2E' },
        muted: '#6B5446', copper: { DEFAULT: '#9A4E24', light: '#F3E1D3' },
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: { card: '0 1px 2px rgba(59,36,24,.06), 0 8px 24px -12px rgba(59,36,24,.18)' },
    },
  },
}
