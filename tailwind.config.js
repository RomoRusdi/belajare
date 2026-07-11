/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0a07', // warm near-black, page background
        'bg-elev': '#171009', // slightly lifted panels / hover
        orange: '#d1503a', // primary accent — retro brick red
        'orange-deep': '#a83a26',
        cream: '#e6d3a5', // secondary accent — vintage sand/tan
        'cream-deep': '#c9b485',
        text: '#efe6d0', // warm paper off-white
        muted: '#988c72', // tiny labels/metadata (AA on bg at ≥12px)
        'muted-2': '#b3a88d', // body paragraphs — lifted for AA at reading size
        line: 'rgba(230,211,165,.16)',
        'line-soft': 'rgba(230,211,165,.07)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'], // heavy condensed headlines
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'], // labels, nav, tags, section numbers
      },
      // Named type scale — Anton is condensed and tall, so displays get a
      // touch of positive tracking (never negative) and can run larger.
      fontSize: {
        // display-xl — Anton — hero + CTA headline
        'display-xl': [
          'clamp(44px, 8.5vw, 140px)',
          { lineHeight: '0.92', letterSpacing: '0.01em' },
        ],
        // display-lg — Anton — About statement
        'display-lg': ['clamp(30px, 5vw, 82px)', { lineHeight: '1.04', letterSpacing: '0.01em' }],
        // display-md — Anton — Work item names
        'display-md': ['clamp(26px, 3.6vw, 54px)', { lineHeight: '1.05', letterSpacing: '0.01em' }],
        // stat — Anton — stat numbers
        stat: ['clamp(46px, 7vw, 112px)', { lineHeight: '0.95', letterSpacing: '0.01em' }],
        // body-lg — Space Grotesk 400/500 — About paragraphs
        'body-lg': ['19px', { lineHeight: '1.55', letterSpacing: '0em' }],
        // body — Space Grotesk 400 — general body
        body: ['17px', { lineHeight: '1.6', letterSpacing: '0em' }],
        // label — Space Mono — ALL kickers/captions/titles/tags/nav/eyebrows.
        // Wide retro tracking is the signature of the style.
        label: ['12px', { lineHeight: '1.4', letterSpacing: '0.28em' }],
      },
    },
  },
  plugins: [],
};
