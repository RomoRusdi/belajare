import { Fragment } from 'react'

/**
 * Render a string with **double-asterisk** spans bolded.
 * Used for intro / bio copy that lives in data.js.
 *
 * <RichText text="I'm **Yusuf**" /> → I'm <strong>Yusuf</strong>
 */
export default function RichText({ text, strongClassName = 'font-semibold text-text' }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className={strongClassName}>
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
