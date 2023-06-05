/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide': 'slide 5s linear infinite',
      },
      keyframes: {
        slide: {
          '0%, 100%': {
            'margin-top': '-270px',
          },
          '5%, 33%': {
            'margin-top': '-180px',
          },
          '38%, 66%': {
            'margin-top': '-90px',
          },
          '71%, 99.99%': {
            'margin-top': '0px'
          }
        },
      },
    }
  },
  plugins: [require("daisyui")],
}

