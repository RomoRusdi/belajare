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
        muted: '#8d867b', // tiny labels/metadata (AA on bg at ≥12px)
        'muted-2': '#a39c90', // body paragraphs — lifted for AA at reading size
        line: 'rgba(243,238,230,.12)',
        'line-soft': 'rgba(243,238,230,.06)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'], // headlines, huge type
        body: ['Hanken Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'], // labels, nav, tags, section numbers
      },
      // Named type scale — display gets bigger + tighter, body calmer +
      // smaller, so the jump between them is dramatic and deliberate. Pair
      // each with the font/weight noted (tokens can't carry family/weight).
      fontSize: {
        // display-xl — Syne 800 — hero + CTA headline
        'display-xl': ['clamp(40px, 9.5vw, 150px)', { lineHeight: '0.84', letterSpacing: '-0.04em' }],
        // display-lg — Syne 700 — About statement
        'display-lg': ['clamp(28px, 4.6vw, 76px)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        // display-md — Syne 700 — Work item names
        'display-md': ['clamp(26px, 3.6vw, 52px)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        // stat — Syne 800 — stat numbers
        stat: ['clamp(46px, 7vw, 108px)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        // body-lg — Hanken 400/500 — About paragraphs
        'body-lg': ['19px', { lineHeight: '1.55', letterSpacing: '0em' }],
        // body — Hanken 400 — general body
        body: ['17px', { lineHeight: '1.6', letterSpacing: '0em' }],
        // label — JetBrains Mono — ALL kickers/captions/titles/tags/nav/eyebrows
        label: ['12px', { lineHeight: '1.2', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [],
};
