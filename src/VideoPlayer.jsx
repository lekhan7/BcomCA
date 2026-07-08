import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './VideoPlayer.css';

export default function VideoPlayer({
  src = "/WhatsApp Video 2026-07-08 at 4.15.26 PM.mp4",
  poster
}) {
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
      setShowOverlay(false);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
      setShowOverlay(true);
    }
  };

  const togglePlay = () => {
    if (playing) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div className="vp-wrapper">
      {/* Glow ring */}
      <div className="vp-glow" />

      <div className="vp-inner" onClick={togglePlay}>
        <video
          muted
          ref={videoRef}
          src={src}
          poster={poster}
          className="vp-video"
          loop
          playsInline
          onEnded={() => { setPlaying(false); setShowOverlay(true); }

          }
        />

        {/* Overlay with play button */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              className="vp-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="vp-play-btn"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                onClick={(e) => { e.stopPropagation(); handlePlay(); }}
                aria-label="Play video"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
              <p className="vp-hint">Click to play</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pause button (visible when playing) */}
        <AnimatePresence>
          {playing && (
            <motion.button
              className="vp-pause-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => { e.stopPropagation(); handlePause(); }}
              aria-label="Pause video"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="vp-label">
        <span className="vp-dot" />
        Class of 2026 · Memories
      </div>
    </div>
  );
}