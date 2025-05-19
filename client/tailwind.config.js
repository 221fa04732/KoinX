/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '72px': '72px',
        "24px" : "24px"
      },
      width: {
        '96px' : "96px"
      },
      margin : {
        "72px" : "72px"
      }
    },
  },
  plugins: [],
}

