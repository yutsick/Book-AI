/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-465': '465px',
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
      translate: {
        z: "var(--spineWidth)",
      },
      screens: {
        'xs': '476px',
        '865': '865px',
      },
      colors: {
        orange: '#EAAC00',
        pink: 'rgba(175, 131, 0, 0.08)',
        gray: {
          DEFAULT: '#2B2B2B',
          300: '#2B2B2B',
          500: '#1E1E1E',
        },
        dark: "#2b2b2b",
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        caveat: ['var(--font-caveat)', 'sans-serif'],
        pacifico: ['var(--font-pacifico)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        anton: ['var(--font-anton)', 'sans-serif'],
        reenie: ['var(--font-reenie)', 'cursive'],
        degular: ['Degular', 'sans-serif'],
        georgia: ['Georgia', 'sans-serif'],


      },
      boxShadow: {
        heroBtnShadow: '0px 1px 4px 2px rgba(130, 130, 130, 0.2)',
        btnShadow: '0px 2.5px 4px 1.9px rgba(128, 128, 128, 0.28)',
        slideShadow: '0px 0px 4px 0px #00000040',

        chatShadow: '0px 2px 4px 2px #00000040',
        worksShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)',

        storyCardShadow: '0px 1px 25px rgba(40, 44, 47, 0.15)',
        chooseShadow: '0px 0px 11.27px 1px rgba(0, 0, 0, 0.62)',
        detailsShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.23)',
        checkoutCardShadow: '0px 0px 4px 0.5px rgba(0, 0, 0, 0.1)',
  },
},
  },
plugins: [
  function ({ addUtilities }) {
    addUtilities({
      '.no-scrollbar': {
        'scrollbar-width': 'none', /* Firefox */
        '-ms-overflow-style': 'none', /* IE 10+ */
      },
      '.no-scrollbar::-webkit-scrollbar': {
        display: 'none', /* Chrome, Safari, Edge */
      },
    });
  },
],
};
