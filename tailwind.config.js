/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#F2EDE3',
        paper: '#FBF8F2',
        walnut: { DEFAULT: '#3B2E26', light: '#5A4638', dark: '#241B15' },
        reed: { DEFAULT: '#3F6B54', light: '#6B9A7E', dark: '#274434' },
        lagoon: { DEFAULT: '#1D6B77', light: '#3E97A3', dark: '#0E3C46' },
        coral: '#C4653A',
        sandy: '#D9C7A5',
        ink: '#20211F',
        muted: '#7C776E'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        tank: '0 24px 60px -24px rgba(14,60,70,0.55), inset 0 0 0 1px rgba(255,255,255,0.35)',
        panel: '0 1px 2px rgba(35,27,21,0.06), 0 8px 24px -18px rgba(35,27,21,0.5)'
      }
    }
  },
  plugins: []
};
