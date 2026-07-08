import { useState, useEffect } from 'react'

const FULL_TEXT = 'SERVICE MANAGER'
const TYPING_SPEED = 120     // ms entre chaque lettre tapée ou effacée
const DISPLAY_DURATION = 5000 // ms d'affichage complet
const PAUSE_DURATION = 1000   // ms de pause, texte vide

function TypewriterTitle() {
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'displaying' | 'erasing' | 'pausing'

  useEffect(() => {
    let timeoutId

    if (phase === 'typing') {
      if (displayedText.length < FULL_TEXT.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(FULL_TEXT.slice(0, displayedText.length + 1))
        }, TYPING_SPEED)
      } else {
        setPhase('displaying')
      }
    }

    if (phase === 'displaying') {
      timeoutId = setTimeout(() => {
        setPhase('erasing')
      }, DISPLAY_DURATION)
    }

    if (phase === 'erasing') {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(FULL_TEXT.slice(0, displayedText.length - 1))
        }, TYPING_SPEED)
      } else {
        setPhase('pausing')
      }
    }

    if (phase === 'pausing') {
      timeoutId = setTimeout(() => {
        setPhase('typing')
      }, PAUSE_DURATION)
    }

    return () => clearTimeout(timeoutId)
  }, [displayedText, phase])

  return (
    <h1 className="text-center text-white font-bold text-4xl md:text-5xl uppercase tracking-wide py-8">
      {displayedText}
      <span className="cursor-blink">|</span>
    </h1>
  )
}

export default TypewriterTitle