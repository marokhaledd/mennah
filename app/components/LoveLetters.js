"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function TypewriterLine({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 26);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <p
      ref={ref}
      className="letter-text"
      style={{
        fontSize: "1.2rem",
        lineHeight: 2,
        color: "var(--plum-deep)",
        minHeight: "2em"
      }}
    >
      {shown}
    </p>
  );
}

function LetterCard({ title, lines, rotate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
      className="letter-envelope"
    >
      {title ? (
        <p
          style={{
            fontFamily: "Aref Ruqaa, serif",
            fontSize: "1.2rem",
            color: "var(--gold)",
            marginBottom: 18,
            textAlign: "center",
            position: "relative"
          }}
        >
          {title}
        </p>
      ) : null}

      <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
        {lines.map((line, i) => (
          <TypewriterLine key={i} text={line} />
        ))}
      </div>
    </motion.div>
  );
}

export default function LoveLetters({ groups, signature }) {
  if (!groups || groups.length === 0) return null;

  return (
    <section
      style={{
        padding: "40px 20px 90px",
        maxWidth: 640,
        margin: "0 auto",
        textAlign: "right"
      }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", fontSize: "1.8rem", color: "var(--gold-soft)", marginBottom: 40 }}
      >
        جواب مكتوب بإيدي
      </motion.h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        {groups.map((group, i) => (
          <LetterCard
            key={i}
            title={group.title}
            lines={group.lines}
            rotate={i % 2 === 0 ? -1 : 1}
          />
        ))}
      </div>

      {signature ? (
        <p
          style={{
            marginTop: 30,
            fontFamily: "Aref Ruqaa, serif",
            fontSize: "1.4rem",
            color: "var(--gold-soft)",
            textAlign: "left"
          }}
        >
          — {signature}
        </p>
      ) : null}
    </section>
  );
}
