/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      boxShadow: {
        pop: '2px 5px 14px #949494'
      }
    }
  },
  plugins: []
}
