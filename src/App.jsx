import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Home'

function App() {
  return (
    <>
      <audio src='/Inaam Jasleen Royal 128 Kbps.mp3'
        className='inaam'
        autoPlay
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