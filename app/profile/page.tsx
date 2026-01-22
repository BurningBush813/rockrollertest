"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";

type Profile = {
  ageRange: string;
  handicap?: string;
  state: string;
};

const STORAGE_PREFIX = "rr_profile_v1:";

const AGE_RANGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

function clampHandicap(v: string) {
  const cleaned = v.replace(/[^\d.-]/g, "");
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return "";
  const clamped = Math.max(-10, Math.min(54, num));
  return String(clamped);
}

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const email = session?.user?.email ?? "";
  const storageKey = useMemo(() => (email ? `${STORAGE_PREFIX}${email}` : ""), [email]);

  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    ageRange: "",
    handicap: "",
    state: "",
  });

  useEffect(() => {
    if (!storageKey) return;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Profile;
        setProfile({
          ageRange: parsed.ageRange || "",
          handicap: parsed.handicap || "",
          state: parsed.state || "",
        });
      }
    } catch {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  if (status === "loading") {
    return (
      <section
        style={{
          width: "100%",
          maxWidth: 920,
          background: "#f8f8f7",
          borderRadius: 20,
          padding: "30px 26px",
          border: "1px solid rgba(0, 131, 60, 0.35)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.14), 0 0 32px rgba(0,131,60,0.18)",
          textAlign: "center",
        }}
      >
        <div style={{ color: "#3f3f3f", fontSize: 16, lineHeight: 1.6, fontWeight: 650 }}>
          Loading your profile…
        </div>
      </section>
    );
  }

  if (!session?.user) {
    return (
      <section
        style={{
          width: "100%",
          maxWidth: 920,
          background: "#f8f8f7",
          borderRadius: 20,
          padding: "30px 26px",
          border: "1px solid rgba(0, 131, 60, 0.35)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.14), 0 0 32px rgba(0,131,60,0.18)",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>Sign in required</h1>
        <p style={{ marginTop: 12, color: "#3f3f3f", lineHeight: 1.7, fontSize: 16, fontWeight: 600 }}>
          Please sign in to view your profile.
        </p>

        <Link
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffb0e7",
            color: "#141414",
            textDecoration: "none",
            borderRadius: 16,
            padding: "16px 18px",
            fontWeight: 950,
            fontSize: 16,
            letterSpacing: "0.02em",
            boxShadow: "0 10px 22px rgba(255,176,231,0.35)",
          }}
        >
          Go to Login
        </Link>
      </section>
    );
  }

  const name = session.user.name || "Golfer";
  const googleImage = session.user.image || "";
  const avatarSrc = googleImage || "/rockroller.png";

  async function saveProfile() {
    if (!storageKey) return;

    setSaving(true);
    try {
      const toSave: Profile = {
        ageRange: profile.ageRange,
        handicap: profile.handicap ? clampHandicap(profile.handicap) : "",
        state: profile.state,
      };
      localStorage.setItem(storageKey, JSON.stringify(toSave));
      setProfile(toSave);
    } finally {
      setSaving(false);
    }
  }

  const profileComplete = !!profile.ageRange && !!profile.state;

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: "#4a4a4a",
    fontWeight: 950,
  };

  const helpStyle: React.CSSProperties = {
    color: "#444444",
    fontSize: 13,
    lineHeight: 1.45,
    fontWeight: 600,
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 14,
    padding: "12px 12px",
    border: "1px solid rgba(0,0,0,0.20)",
    background: "#f8f8f7",
    fontSize: 16,
    fontWeight: 750,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 980,
        background: "#f8f8f7",
        borderRadius: 20,
        padding: "26px 24px",
        border: "1px solid rgba(0, 131, 60, 0.40)",
        boxShadow: `
          0 16px 36px rgba(0,0,0,0.16),
          0 0 0 1px rgba(0,131,60,0.26),
          0 0 28px rgba(0,131,60,0.22),
          0 0 64px rgba(0,131,60,0.14)
        `,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.18)",
              background: "rgba(255,255,255,0.90)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Image
              src={avatarSrc}
              alt="Profile photo"
              width={64}
              height={64}
              style={{ width: 64, height: 64, objectFit: "cover" }}
            />
          </div>

          <div style={{ lineHeight: 1.1 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4a4a4a",
                fontWeight: 950,
              }}
            >
              Profile
            </div>
            <div style={{ fontSize: 24, fontWeight: 950, marginTop: 4, color: "#151515" }}>
              {name}
            </div>
            <div style={{ color: "#3f3f3f", fontSize: 14, marginTop: 6, fontWeight: 650 }}>
              {email}
            </div>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            background: "#ffffff",
            color: "#151515",
            border: "1px solid rgba(0,0,0,0.22)",
            borderRadius: 14,
            padding: "12px 14px",
            fontWeight: 950,
            fontSize: 12,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Big CTA */}
      <div style={{ marginTop: 18 }}>
        <Link href="/check-in" style={{ display: "block", textDecoration: "none" }}>
          <div
            style={{
              borderRadius: 18,
              background: "#ffb0e7",
              color: "#141414",
              padding: "20px 18px",
              boxShadow: "0 12px 26px rgba(255,176,231,0.30)",
              border: "1px solid rgba(0,0,0,0.10)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 1000, letterSpacing: "0.01em" }}>
              Daily Check-In
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 15,
                color: "#151515",
                opacity: 0.90,
                lineHeight: 1.6,
                fontWeight: 650,
              }}
            >
              Two quick questions. No streaks. Just a read on today.
            </div>
          </div>
        </Link>

        <p
          style={{
            margin: "12px 0 0",
            textAlign: "center",
            fontSize: 12,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#4a4a4a",
            fontWeight: 850,
          }}
        >
          Better Prepared Golfers
        </p>
      </div>

      {/* Profile editor */}
      <div
        style={{
          marginTop: 18,
          borderRadius: 18,
          border: "1px solid rgba(0,0,0,0.10)",
          background: "#ffffff",
          boxShadow: "0 10px 22px rgba(0,0,0,0.06)",
          padding: "18px 18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "baseline",
            flexWrap: "wrap",
            paddingBottom: 10,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 950,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#4a4a4a",
            }}
          >
            About You
          </div>

          {loaded ? (
            <div
              style={{
                fontSize: 12,
                color: profileComplete ? "#00833c" : "#4a4a4a",
                fontWeight: 950,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {profileComplete ? "Saved" : "Optional (but helpful)"}
            </div>
          ) : null}
        </div>

        {/* Fields (no PFP upload) */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {/* Age Range */}
          <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <label style={labelStyle}>Age Range</label>
            <select
              value={profile.ageRange}
              onChange={(e) => setProfile((p) => ({ ...p, ageRange: e.target.value }))}
              style={fieldStyle}
            >
              <option value="">Select…</option>
              {AGE_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <label style={labelStyle}>State</label>
            <select
              value={profile.state}
              onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value }))}
              style={fieldStyle}
            >
              <option value="">Select…</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Handicap */}
          <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <label style={labelStyle}>Handicap (optional)</label>
            <input
              value={profile.handicap || ""}
              onChange={(e) => setProfile((p) => ({ ...p, handicap: e.target.value }))}
              inputMode="decimal"
              placeholder="e.g. 12.4"
              style={fieldStyle}
            />
            <div style={helpStyle}>Leave blank if you don’t track it.</div>
          </div>

          {/* Placeholder card so grid stays balanced (optional) */}
          <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <label style={labelStyle}>Profile Photo</label>
            <div style={{ ...helpStyle }}>
              Uses your Google photo by default. Upload coming later.
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <button
            onClick={saveProfile}
            disabled={saving}
            style={{
              background: "#00833c",
              color: "#ffffff",
              border: "none",
              borderRadius: 16,
              padding: "16px 18px",
              fontWeight: 1000,
              fontSize: 16,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: saving ? "not-allowed" : "pointer",
              boxShadow: "0 10px 22px rgba(0,131,60,0.22)",
              opacity: saving ? 0.75 : 1,
            }}
          >
            {saving ? "Saving…" : "Save Profile"}
          </button>

          <Link
            href="/check-in"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#ffffff",
              color: "#151515",
              border: "1px solid rgba(0,0,0,0.22)",
              borderRadius: 16,
              padding: "16px 18px",
              fontWeight: 950,
              fontSize: 14,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Go to Check-In
          </Link>
        </div>
      </div>
    </section>
  );
}
