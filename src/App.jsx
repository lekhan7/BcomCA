import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  const audioRef = useRef(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.5;
  }, []);

  const playMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio
      .play()
      .then(() => {
        setShowButton(false);
      })
      .catch((err) => {
        console.error("Playback failed:", err);
      });
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/Inaam Jasleen Royal 128 Kbps.mp3"
        loop
        preload="auto"
      />

      {showButton && (
        <button
          onClick={playMusic}
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "16px 45px",
            border: "none",
            outline: "none",
            borderRadius: "50px",
            background:
              "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "1px",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(221,36,118,0.45)",
            transition: "all 0.3s ease",
            zIndex: "99999",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateX(-50%) scale(1.08)";
            e.currentTarget.style.boxShadow =
              "0 15px 40px rgba(221,36,118,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateX(-50%) scale(1)";
            e.currentTarget.style.boxShadow =
              "0 10px 30px rgba(221,36,118,0.45)";
          }}
        >
          🎵 Click Me
        </button>
      )}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;