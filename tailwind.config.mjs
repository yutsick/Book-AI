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
        orange: '#EAAC00',
        pink: 'rgba(175, 131, 0, 0.08)',
        gray: '#2B2B2B'
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'], 
        inter: ['var(--font-inter)', 'sans-serif'], 
      },
      boxShadow: {
        heroBtnShadow: '0px 0px 2.13px 2.13px #82828275',
        btnShadow: '0px 2.5px 4px 1.9px rgba(128, 128, 128, 0.28)', 
        slideShadow:'0px 0px 4px 0px #00000040',

        chatShadow: '0px 2px 4px 2px #00000040',
        worksShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)'


      },
    },
  },
  plugins: [
   
  ],
};
