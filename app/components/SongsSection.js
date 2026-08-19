"use client";

import { motion } from "framer-motion";
import SongPlayer from "./SongPlayer.js";

export default function SongsSection({ songs }) {
  if (!songs || songs.length === 0) return null;

  return (
    <section style={{ padding: "40px 20px 70px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "var(--gold-soft)",
          marginBottom: 36
        }}
      >
        {songs.length > 1 ? "أغانينا" : "أغنيتنا"}
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "44px 60px"
        }}
      >
        {songs.map((song, i) => (
          <motion.div
            key={song.src + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <SongPlayer song={song} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
