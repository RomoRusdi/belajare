import { useState } from 'react'
import Preloader from './components/Preloader.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import GrainOverlay from './components/GrainOverlay.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Stack from './components/Stack.jsx'
import Stats from './components/Stats.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // `loaded` flips true when the preloader finishes counting to 100%.
  // The hero waits for it so its entrance plays after the reveal.
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Atmosphere — purely decorative, sit above the page, ignore pointer */}
      <CursorGlow />
      <GrainOverlay />

      <Navbar />

      <main>
        <Hero loaded={loaded} />
        <Marquee />
        <About />
        <Work />
        <Stack />
        <Stats />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
