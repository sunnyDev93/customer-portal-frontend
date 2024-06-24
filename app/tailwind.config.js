module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'breakpoint-575': '575px',
        'breakpoint-max-575': { max: '575px' },
        'breakpoint-max-970': { max: '970px' },
        'breakpoint-1388': '1388px',
        'breakpoint-1162': '1162px',
        'breakpoint-1420': '1420px',
        'breakpoint-1060': '1060px',
        'breakpoint-680': '680px',
      },
      boxShadow: {
        'mode-1': '0px 6px 12px rgba(106, 115, 129, 0.16), 0px 3px 8px rgba(87, 102, 117, 0.06)',
        'mode-2': '0px 1px 3px rgba(0, 0, 0, 0.25)',
      },
      fontSize: {
        'font-32px': '32px',
        'font-18px': '18px',
        'font-16px': '16px',
        'font-14px': '14px',
      },
      width: {
        '78px': '78px',
        '140px': '140px',
        '520px': '520px',
        '140px-offset': 'calc(100% - 140px)',
      },
      height: {
        '24px': '24px',
        '140px': '140px',
        '155px': '155px',
      },
      lineHeight: {
        '16px': '16px',
        '20px': '20px',
        '24px': '24px',
      },
      colors: {
        aptive: {
          300: '#e1ebe5',
          500: '#cddbd0',
          600: '#78856e',
          700: '#b8ccc9',
          800: '#49604d',
          900: '#344c38',
          1000: '#101722',
          link: '#3B82F6',
          'label-100': '#121417',
        },
        red: {
          500: '#F05252',
          100: '#FDE8E8',
        },
        green: {
          500: '#0E9F6E',
        },
        grass: {
          500: '#309C42',
        },
        custom: {
          10: '#6B778C',
        },
      },
      maxWidth: {
        '85px': '85px',
        '105px': '105px',
      },
      fontFamily: {
        GTSuper: ['GT Super Text'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
