import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.5;

    const playMusic = () => {
      audio.play().catch((err) => {
        console.log("Playback failed:", err);
      });

      window.removeEventListener("click", playMusic);
      window.removeEventListener("touchstart", playMusic);
      window.removeEventListener("keydown", playMusic);
    };

    // Try autoplay
    audio.play().catch(() => {
      console.log("Autoplay blocked. Waiting for user interaction...");

      window.addEventListener("click", playMusic, { once: true });
      window.addEventListener("touchstart", playMusic, { once: true });
      window.addEventListener("keydown", playMusic, { once: true });
    });

    return () => {
      window.removeEventListener("click", playMusic);
      window.removeEventListener("touchstart", playMusic);
      window.removeEventListener("keydown", playMusic);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/music.mp3" // Put music.mp3 inside the public folder
      />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;