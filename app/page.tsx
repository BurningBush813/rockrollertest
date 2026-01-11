import Link from "next/link";

export default function HomePage() {
  return (
    <section
      style={{
        width: "100%",
        maxWidth: 560,
        background: "#f8f8f7",
        borderRadius: 18,
        padding: "32px 28px",
        border: "1px solid rgba(0, 131, 60, 0.35)",

        /* ✨ Neon green glow */
        boxShadow: `
          0 14px 32px rgba(0,0,0,0.18),
          0 0 0 1px rgba(0,131,60,0.30),
          0 0 28px rgba(0,131,60,0.35),
          0 0 64px rgba(0,131,60,0.18)
        `,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <img
          src="/rockroller.png"
          alt="Rock Roller Golf"
          style={{
            width: 180,
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Copy */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <h1
          style={{
            fontSize: 30,
            margin: "0 0 10px",
            fontWeight: 700,
          }}
        >
          Better Prepared Golfers.
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
            color: "#5f5f5f",
          }}
        >
          A quiet daily check-in to build awareness around mindset, confidence,
          and growth — without pressure or judgment.
        </p>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 28, display: "grid", gap: 12 }}>
        <Link href="/check-in">
          <button
            type="button"
            style={{
              width: "100%",
              background: "#ffb0e7",
              color: "#141414",
              border: "none",
              borderRadius: 14,
              padding: "14px 16px",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "0.02em",
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(255,176,231,0.35)",
            }}
          >
            Start today’s check-in
          </button>
        </Link>

        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#777777",
          }}
        >
          No streaks. No scoring. Just reflection.
        </p>
      </div>

      {/* Keywords */}
      <div
        style={{
          marginTop: 22,
          display: "flex",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
          fontSize: 13,
          color: "#777777",
        }}
      >
        <span>Mindset</span>
        <span>•</span>
        <span>Confidence</span>
        <span>•</span>
        <span>Awareness</span>
      </div>
    </section>
  );
}
