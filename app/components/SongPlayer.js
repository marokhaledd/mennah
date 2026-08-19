"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SongPlayer({ song }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16
      }}
    >
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.96 }}
        animate={{ rotate: playing ? 360 : 0 }}
        transition={
          playing
            ? { repeat: Infinity, duration: 6, ease: "linear" }
            : { duration: 0.3 }
        }
        aria-label={playing ? "وقف الأغنية" : "شغل الأغنية"}
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          background:
            "repeating-radial-gradient(circle, #170a12 0px, #170a12 6px, #241420 7px, #241420 12px)",
          border: "3px solid var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "var(--gold-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color: "var(--plum-deep)"
          }}
        >
          {playing ? "❚❚" : "▶"}
        </span>
      </motion.button>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "var(--cream)", fontSize: "1rem", margin: 0 }}>
          {song.title}
        </p>
        <p style={{ color: "var(--blush)", fontSize: "0.8rem", margin: "4px 0 0", opacity: 0.85 }}>
          {song.artist}
        </p>
      </div>

      <audio ref={audioRef} src={song.src} onEnded={() => setPlaying(false)} />
    </div>
  );
}
