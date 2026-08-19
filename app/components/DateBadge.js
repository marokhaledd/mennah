"use client";

export default function DateBadge({ dates }) {
  if (!dates || dates.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 14,
        left: 14,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        pointerEvents: "none"
      }}
    >
      {dates.map((d, i) => (
        <div
          key={i}
          style={{
            background: "rgba(42, 20, 32, 0.6)",
            border: "1px solid rgba(255, 95, 162, 0.4)",
            borderRadius: 999,
            padding: "5px 13px",
            fontFamily: "Amiri, serif",
            fontStyle: "italic",
            fontSize: "0.72rem",
            color: "var(--gold-soft)",
            backdropFilter: "blur(4px)",
            display: "flex",
            gap: 6,
            alignItems: "center",
            whiteSpace: "nowrap"
          }}
        >
          {d.label ? <span style={{ opacity: 0.75 }}>{d.label}:</span> : null}
          <span>{d.value}</span>
        </div>
      ))}
    </div>
  );
}
