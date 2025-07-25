/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],  
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
       fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        baby_bear :['Baby Bear', 'sans-serif'],
      },
  	}
  },
  plugins: [plugin],
}