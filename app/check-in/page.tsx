"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Option = {
  id: string;
  label: string;
};

export default function CheckInPage() {
  const router = useRouter();

  const [activity, setActivity] = useState<string | null>(null);
  const [feel, setFeel] = useState<string | null>(null);

  const activityOptions: Option[] = [
    { id: "played", label: "Played a round" },
    { id: "practiced", label: "Practiced" },
    { id: "mental", label: "Engaged mentally" },
    { id: "none", label: "Didn’t engage" },
  ];

  const feelOptions: Option[] = [
    { id: "confident", label: "Confident" },
    { id: "neutral", label: "Neutral" },
    { id: "unsure", label: "Unsure" },
    { id: "frustrated", label: "Frustrated" },
  ];

  const canContinue = Boolean(activity && feel);

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 860,
        background: "#f8f8f7",
        borderRadius: 20,
        padding: "34px 30px",
        border: "1px solid rgba(0, 131, 60, 0.40)",
        boxShadow: `
          0 16px 36px rgba(0,0,0,0.18),
          0 0 0 1px rgba(0,131,60,0.30),
          0 0 32px rgba(0,131,60,0.35),
          0 0 72px rgba(0,131,60,0.20)
        `,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            margin: "0 0 10px",
            fontWeight: 700,
            color: "#1b1b1b",
          }}
        >
          Daily Check-In
        </h1>
        <p
          style={{
            margin: 0,
            color: "#555555",
            lineHeight: 1.65,
            fontSize: 16,
          }}
        >
          Two quick questions. No pressure. Just a read on today.
        </p>
      </div>

      {/* Question 1 */}
      <section style={{ marginTop: 32 }}>
        <h2
          style={{
            fontSize: 15,
            margin: "0 0 16px",
            fontWeight: 800,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#5f5f5f",
          }}
        >
          How did you engage with the game today?
        </h2>

        <div
          className="rr-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {activityOptions.map((opt) => {
            const selected = activity === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActivity(opt.id)}
                aria-pressed={selected}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: 18,
                  padding: "18px 18px",
                  background: selected
                    ? "rgba(255,176,231,0.35)"
                    : "#ffffff",
                  border: selected
                    ? "2px solid rgba(255,176,231,0.95)"
                    : "1px solid rgba(0,0,0,0.10)",
                  boxShadow: selected
                    ? "0 12px 26px rgba(255,176,231,0.22)"
                    : "0 10px 22px rgba(0,0,0,0.06)",
                  transition:
                    "transform 120ms ease, box-shadow 120ms ease, background 120ms ease",
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#1b1b1b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Question 2 */}
      <section style={{ marginTop: 34 }}>
        <h2
          style={{
            fontSize: 15,
            margin: "0 0 16px",
            fontWeight: 800,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#5f5f5f",
          }}
        >
          How do you feel right now?
        </h2>

        <div
          className="rr-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {feelOptions.map((opt) => {
            const selected = feel === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFeel(opt.id)}
                aria-pressed={selected}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  borderRadius: 18,
                  padding: "18px 18px",
                  background: selected
                    ? "rgba(255,176,231,0.35)"
                    : "#ffffff",
                  border: selected
                    ? "2px solid rgba(255,176,231,0.95)"
                    : "1px solid rgba(0,0,0,0.10)",
                  boxShadow: selected
                    ? "0 12px 26px rgba(255,176,231,0.22)"
                    : "0 10px 22px rgba(0,0,0,0.06)",
                  transition:
                    "transform 120ms ease, box-shadow 120ms ease, background 120ms ease",
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#1b1b1b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Actions */}
      <div
        style={{
          marginTop: 34,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => {
            if (!canContinue) return;
            router.push(
              `/recommendation?activity=${encodeURIComponent(
                activity as string
              )}&feel=${encodeURIComponent(feel as string)}`
            );
          }}
          style={{
            background: canContinue ? "#ffb0e7" : "rgba(255,176,231,0.35)",
            color: canContinue ? "#141414" : "rgba(20,20,20,0.55)",
            border: "none",
            borderRadius: 16,
            padding: "18px 20px",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "0.02em",
            cursor: canContinue ? "pointer" : "not-allowed",
            boxShadow: canContinue
              ? "0 10px 22px rgba(255,176,231,0.35)"
              : "none",
          }}
        >
          Continue
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/recommendation?activity=skip&feel=skip")
          }
          style={{
            background: "#ffffff",
            color: "#1b1b1b",
            border: "1px solid rgba(0,0,0,0.22)",
            borderRadius: 16,
            padding: "18px 20px",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Skip Today
        </button>
      </div>

      {/* Footer note */}
      <p
        style={{
          margin: "18px 0 0",
          textAlign: "center",
          fontSize: 13,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "#777777",
        }}
      >
        No streaks. No scoring. Just reflection.
      </p>

      {/* Mobile */}
      <style>{`
        @media (max-width: 640px) {
          .rr-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
