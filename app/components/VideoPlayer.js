"use client";

import { motion } from "framer-motion";

export default function VideoPlayer({ video }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      style={{ margin: 0, maxWidth: 420, width: "100%" }}
    >
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid var(--gold-soft)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
        }}
      >
        <video
          src={video.src}
          controls
          playsInline
          preload="metadata"
          style={{ display: "block", width: "100%", background: "#000" }}
        />
      </div>
      {video.caption ? (
        <figcaption
          style={{
            fontFamily: "Amiri, serif",
            textAlign: "center",
            marginTop: 10,
            color: "var(--cream)",
            opacity: 0.85,
            fontSize: "0.95rem",
            padding: "0 10px"
          }}
        >
          {video.caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
