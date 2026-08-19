"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONFETTI_COLORS = ["#ff5fa2", "#ffa3c9", "#ffe9f2", "#ff8fb8"];
const BALLOONS = ["🎈", "🎈", "🎂", "🎈", "🎉", "🎈"];

function useConfetti(count = 46) {
  return useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      duration: 2.2 + Math.random() * 1.6,
      delay: Math.random() * 0.6,
      rotate: Math.random() * 360,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
    }));
  }, [count]);
}

function useBalloons(count = 10) {
  return useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      size: 28 + Math.random() * 22,
      duration: 3.2 + Math.random() * 1.8,
      delay: Math.random() * 0.8,
      emoji: BALLOONS[Math.floor(Math.random() * BALLOONS.length)]
    }));
  }, [count]);
}

export default function BirthdayOverlay({ show, name }) {
  const confetti = useConfetti(46);
  const balloons = useBalloons(10);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="birthday-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              className="confetti-piece"
              initial={{ x: 0, y: -20, opacity: 0, rotate: 0 }}
              animate={{
                y: "110vh",
                x: [0, 20, -15, 0],
                opacity: [0, 1, 1, 0.4],
                rotate: c.rotate + 360
              }}
              transition={{ duration: c.duration, delay: c.delay, ease: "easeIn" }}
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 0.4,
                background: c.color,
                borderRadius: 2
              }}
            />
          ))}

          {balloons.map((b) => (
            <motion.span
              key={b.id}
              className="balloon-piece"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: "-120vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: b.duration, delay: b.delay, ease: "easeOut" }}
              style={{ left: `${b.left}%`, fontSize: b.size }}
            >
              {b.emoji}
            </motion.span>
          ))}

          <motion.p
            className="birthday-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            🎂 Happy Birthday {name} 🎂
          </motion.p>
          <motion.p
            className="birthday-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            ✨ بتتفتح دلوقتي ✨
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
