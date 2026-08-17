/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tideBg: '#FAFAF8',
        tideText: '#14171A',
        tideMuted: '#6B7280',
        tideBorder: '#E8E7E3',
        tideAccent: '#0E7C86',
        tideAccentLight: '#E4F1F1',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
