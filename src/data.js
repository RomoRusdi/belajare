/**
 * ============================================================
 *  SITE DATA — edit everything about the portfolio here.
 *  No copy lives hard-coded in components; pull from this file.
 * ============================================================
 */

export const site = {
  // Identity
  name: 'Muhammad Romeo Raffael',
  initials: 'MR', // shown in the navbar logo + footer
  role: 'Fullstack Developer · Web & Mobile', // hero kicker
  city: 'Semarang',
  country: 'Indonesia',
  email: 'romeoraffael24@gmail.com',
  available: true, // toggles the navbar "Available for work" status

  // Hero headline — three stacked lines. `outline: true` renders the
  // word in the transparent / stroked display style.
  heroLines: [
    { text: 'Building', outline: false },
    { text: 'scalable', outline: true },
    { text: 'apps', outline: false },
  ],

  // Short intro shown in the hero footer row. Use **double asterisks**
  // to bold a span (rendered by the Hero component).
  heroIntro:
    "I'm **Romeo**, a fullstack developer & Computer Engineering student in **Semarang** — I build modern web and mobile apps with React, Node.js, Flutter, and Supabase.",
}

/* Marquee tech keywords (Marquee section) */
export const marqueeItems = [
  'React',
  'Node.js',
  'Flutter',
  'Supabase',
  'Express',
  'MongoDB',
  'Tailwind',
  'Vite',
]

/* About (01) — big statement. `accents` are words rendered in orange. */
export const about = {
  statement: 'I build modern apps that are scalable, fast, and feel effortless to use.',
  accents: ['scalable', 'fast'],
  // Two body paragraphs. Use **double asterisks** to bold spans.
  paragraphs: [
    "I'm a Computer Engineering student at **Universitas Diponegoro** (semester 5), focused on fullstack web and mobile development. I build modern, scalable apps with **React, Node.js, Flutter, and Supabase** — and I love turning a rough problem into something that just works.",
    "During my internship at **BBPMP Jawa Tengah** I designed the backend for an IoT water-tank monitoring system — RESTful APIs in Node.js, MQTT for real-time sensor data, and MongoDB for the logs. I'm a **fast learner**, just as happy debugging a server as shaping a clean UI.",
  ],
}

/* Work (02) — featured projects from the CV. */
export const projects = [
  {
    name: 'MyBookshelf',
    tags: ['PWA', 'React', 'Supabase'],
    link: '#',
  },
  {
    name: 'DompetKu',
    tags: ['React', 'Supabase', 'Recharts'],
    link: '#',
  },
  {
    name: 'Water Tank IoT',
    tags: ['Node.js', 'MQTT', 'MongoDB'],
    link: '#',
  },
]

/* Stack (03) — technologies. */
export const stack = [
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'Flutter',
  'Dart',
  'Supabase',
  'MongoDB',
  'PostgreSQL',
  'Tailwind CSS',
  'Vite',
  'Git',
]

/* Stats — 4 figures. `value` is the number, `unit` the orange suffix. */
export const stats = [
  { value: '5', unit: '+', label: 'Years coding' },
  { value: '3', unit: '', label: 'Featured projects' },
  { value: '2', unit: '', label: 'Internships' },
  { value: '15', unit: '+', label: 'Technologies' },
]

/* Navigation links (Navbar + Footer "Navigate" column) */
export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

/* Social / external links */
export const socials = {
  connect: [
    { label: 'Email', href: 'mailto:romeoraffael24@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'WhatsApp', href: '' },
  ],
  elsewhere: [
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/raffael45__/' },
    { label: 'Diponegoro Univ.', href: 'https://undip.ac.id/' },
  ],
}
