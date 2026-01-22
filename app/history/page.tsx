import Link from "next/link";

export default function HistoryPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 760,
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 22,
          padding: "28px",
          boxShadow: "0 18px 55px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontSize: 30,
              letterSpacing: "0.02em",
              color: "#141414",
            }}
          >
            History
          </h1>

          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              color: "#3f3f3f",
              lineHeight: 1.6,
              fontSize: 16,
            }}
          >
            Revisit past check-ins and the content you were given — no streaks,
            no pressure.
          </p>
        </div>

        <div
          style={{
            marginTop: 22,
            padding: 18,
            borderRadius: 16,
            background: "rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ margin: 0, color: "#2f2f2f", lineHeight: 1.6 }}>
            Coming next: a clean list of previous days so you can re-read a
            module and re-watch the video you got that day.
          </p>
        </div>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/profile" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.16)",
                background: "white",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Back to Profile
            </button>
          </Link>

          <Link href="/check-in" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#ffb0e7",
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 10px 22px rgba(255,176,231,0.28)",
              }}
            >
              Daily Check-In
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
