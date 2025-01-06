/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        orange: '#E97F39',
        pink: '#F6F0EB',
        gray: '#404040'
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'], 
        inter: ['var(--font-inter)', 'sans-serif'], 
      },
      boxShadow: {
        heroBtnShadow: '0px 0px 2.13px 2.13px #82828275',
        btnShadow: '0px 1.5px 4.12px 0px #000000E0', 
        chatShadow: '0px 2px 4px 2px #00000040',
        worksShadow: '0px 0px 4px 2px #00000040'


      },
    },
  },
  plugins: [],
};
