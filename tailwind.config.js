/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: 'rgb(var(--c-shell) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        walnut: {
          DEFAULT: 'rgb(var(--c-walnut) / <alpha-value>)',
          light: 'rgb(var(--c-walnut-light) / <alpha-value>)',
          dark: 'rgb(var(--c-walnut-dark) / <alpha-value>)'
        },
        reed: {
          DEFAULT: 'rgb(var(--c-reed) / <alpha-value>)',
          light: 'rgb(var(--c-reed-light) / <alpha-value>)',
          dark: 'rgb(var(--c-reed-dark) / <alpha-value>)'
        },
        lagoon: {
          DEFAULT: 'rgb(var(--c-lagoon) / <alpha-value>)',
          light: 'rgb(var(--c-lagoon-light) / <alpha-value>)',
          dark: 'rgb(var(--c-lagoon-dark) / <alpha-value>)'
        },
        coral: 'rgb(var(--c-coral) / <alpha-value>)',
        sandy: 'rgb(var(--c-sandy) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)'
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