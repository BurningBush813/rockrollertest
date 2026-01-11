"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <section
      style={{
        width: "100%",
        maxWidth: 520,
        background: "#f8f8f7",
        borderRadius: 20,
        padding: "34px 30px",
        border: "1px solid rgba(0, 131, 60, 0.35)",
        boxShadow: `
          0 16px 36px rgba(0,0,0,0.14),
          0 0 32px rgba(0,131,60,0.18)
        `,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 30,
          fontWeight: 800,
          textAlign: "center",
        }}
      >
        Sign in to Rock Roller
      </h1>

      <p
        style={{
          marginTop: 12,
          marginBottom: 28,
          textAlign: "center",
          color: "#555555",
          lineHeight: 1.7,
          fontSize: 16,
        }}
      >
        Use your Google account to save your check-ins and profile.
        <br />
        No passwords. No pressure.
      </p>

      <button
        onClick={() => signIn("google", { callbackUrl: "/profile" })}
        style={{
          width: "100%",
          background: "#ffb0e7",
          color: "#141414",
          border: "none",
          borderRadius: 16,
          padding: "16px 18px",
          fontWeight: 900,
          fontSize: 16,
          letterSpacing: "0.02em",
          cursor: "pointer",
          boxShadow: "0 10px 22px rgba(255,176,231,0.35)",
        }}
      >
        Continue with Google
      </button>

      <p
        style={{
          marginTop: 22,
          textAlign: "center",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#777777",
        }}
      >
        Better Prepared Golfers
      </p>
    </section>
  );
}
