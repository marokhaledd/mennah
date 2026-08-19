"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function parseDate(str) {
  const match = str && str.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!match) return null;
  const [, d, m, y] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

export default function TimeSinceCounter({ since, label }) {
  const [elapsed, setElapsed] = useState(null);

  useEffect(() => {
    const startDate = parseDate(since);
    if (!startDate) return;

    function tick() {
      const diff = Math.max(0, Date.now() - startDate.getTime());
      const totalSeconds = Math.floor(diff / 1000);
      setElapsed({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [since]);

  if (!elapsed) return null;

  const units = [
    { value: elapsed.days, unitLabel: "يوم" },
    { value: elapsed.hours, unitLabel: "ساعة" },
    { value: elapsed.minutes, unitLabel: "دقيقة" },
    { value: elapsed.seconds, unitLabel: "ثانية" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.55 }}
      style={{ textAlign: "center", zIndex: 1 }}
    >
      {label ? (
        <p
          className="letter-text"
          style={{
            color: "var(--gold-soft)",
            fontStyle: "italic",
            fontSize: "0.95rem",
            marginBottom: 12,
            opacity: 0.9
          }}
        >
          {label}
        </p>
      ) : null}

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {units.map((u) => (
          <div
            key={u.unitLabel}
            style={{
              background: "rgba(42, 20, 32, 0.55)",
              border: "1px solid rgba(255, 95, 162, 0.4)",
              borderRadius: 12,
              padding: "10px 14px",
              minWidth: 62,
              backdropFilter: "blur(3px)"
            }}
          >
            <div
              style={{
                fontFamily: "Aref Ruqaa, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--cream)",
                textShadow: "0 0 12px rgba(255, 95, 162, 0.55)",
                lineHeight: 1.1
              }}
            >
              {String(u.value).padStart(2, "0")}
            </div>
            <div style={{ fontSize: "0.68rem", color: "var(--gold-soft)", opacity: 0.85, marginTop: 4 }}>
              {u.unitLabel}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
