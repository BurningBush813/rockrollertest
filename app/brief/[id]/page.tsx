import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background: "#dededd", // pulled from logo background
      }}
    >
      {/* App Card */}
      <section
        style={{
          width: "100%",
          maxWidth: 560,
          background: "#f8f8f7",
          borderRadius: 16,
          padding: "32px 28px",
          boxShadow: "0 14px 32px rgba(0,0,0,0.18)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/logowhite.jpg"
            alt="Rock Roller Golf"
            width={240}
            height={120}
            priority
          />
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <h1
            style={{
              fontSize: 30,
              margin: "0 0 10px",
              color: "#2b2b2b",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            Better prepared golfers.
          </h1>

          <p
            style={{
              margin: 0,
              color: "#5f5f5f",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            A quiet daily check-in to build awareness around mindset,
            confidence, and growth — without pressure or judgment.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 28, display: "grid", gap: 12 }}>
          <Link href="/check-in">
            <button
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
              type="button"
            >
              Start today’s check-in
            </button>
          </Link>

          <p
            style={{
              margin: 0,
              textAlign: "center",
              color: "#777777",
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
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
    </div>
  );
}
