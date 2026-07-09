import React, { useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Home'

function App() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Try real autoplay first (works if browser allows it)
    audio.play().catch(() => {
      // Blocked — fall back to muted autoplay, unmute on first interaction
      audio.muted = true
      audio.play().catch(err => console.log('Even muted play blocked:', err))

      const unmute = () => {
        audio.muted = false
        audio.play().catch(() => { })
        window.removeEventListener('hover', unmute)
        window.removeEventListener('touchstart', unmute)
        window.removeEventListener('scroll', unmute)
        window.removeEventListener('keydown', unmute)
      }

      window.addEventListener('hover', unmute)
      window.addEventListener('touchstart', unmute)
      window.addEventListener('scroll', unmute)
      window.addEventListener('keydown', unmute)
    })
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        src='/Inaam%20Jasleen%20Royal%20128%20Kbps.mp3'
        className='inaam'
        loop
      />
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </Router>
    </>
  )
}

export default App