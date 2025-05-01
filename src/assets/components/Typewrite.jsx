import { useEffect, useState } from "react"

const phrases = ["Elektronik", "Pakaian", "Aksesoris", "Peralatan Rumah Tangga", "Kecantikan"]

export default function Typewriter() {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const timeout = setTimeout(() => {
      if (charIndex < currentPhrase.length) {
        setText((prev) => prev + currentPhrase[charIndex])
        setCharIndex((prev) => prev + 1)
      } else {
        setTimeout(() => {
          setText("")
          setCharIndex(0)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }, 1000)
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [charIndex, phraseIndex])

  return (
    <p className="text-8xl font-bold text-center pb-8">
      {text}
      <span className="animate-pulse">|</span>
    </p>
  )
}