// tailwind.config.js
module.exports = {
  future: {},
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    	fontFamily: {
	    	sans: ['"Raleway"', 'sans-serif'],
	    	serif: ['"Arvo"', 'serif'],
	    	quicksand: ['"Quicksand"', 'sans-serif'],
        futura: ['futura-pt', 'sans-serif'],
    	}
    },
  },
  variants: {},
  plugins: [],
}