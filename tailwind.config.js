/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0a08', // warm near-black, page background
        'bg-elev': '#13110e', // slightly lifted panels / hover
        orange: '#ff5a1f', // primary accent
        'orange-deep': '#e8470c',
        text: '#f3eee6', // warm off-white
        muted: '#8d867b',
        line: 'rgba(243,238,230,.12)',
        'line-soft': 'rgba(243,238,230,.06)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'], // headlines, huge type
        body: ['Hanken Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'], // labels, nav, tags, section numbers
      },
    },
  },
  plugins: [],
};
