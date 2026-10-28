export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EBDA',   // parchment
        paper: '#FFF9EE',
        crema: '#EADBC3',
        espresso: { DEFAULT: '#2A1810', soft: '#45281B' },
        muted: '#6A4B3A',
        copper: { DEFAULT: '#7A2430', light: '#F2DCD6' }, // oxblood accent (name kept for brevity)
        gold: { DEFAULT: '#7E5A12', bright: '#C9A24A', light: '#F3E4BF' },
        leaf: '#2F4A35',
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', '"Book Antiqua"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(201,162,74,.35) inset, 0 1px 2px rgba(42,24,16,.08), 0 10px 28px -14px rgba(42,24,16,.35)',
      },
    },
  },
}
