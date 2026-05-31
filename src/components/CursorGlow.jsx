import { useEffect, useRef, useState } from 'react'

/**
 * CursorGlow — a soft radial orange glow that trails the mouse.
 *
 * Uses mix-blend-mode: screen so it lifts the background without
 * washing out text. Only enabled on fine pointers (real mouse); on
 * touch / coarse pointers it renders nothing. Position is written
 * straight to the DOM via a ref (no React re-render per mousemove).
 */
export default function CursorGlow() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only on devices with a precise pointer that can hover.
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)')
    setEnabled(mq.matches)

    const onChange = (e) => setEnabled(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        el.style.opacity = '1'
      })
    }
    const leave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[40] h-[520px] w-[520px] opacity-0 mix-blend-screen transition-opacity duration-300"
      style={{
        marginLeft: '-260px',
        marginTop: '-260px',
        background:
          'radial-gradient(circle, rgba(255,90,31,0.16) 0%, rgba(255,90,31,0.06) 35%, transparent 70%)',
      }}
    />
  )
}
