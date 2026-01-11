"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Module = {
  id: number;
  title: string;
  paragraphs: string[];
};

type LogEntry = {
  id: string; // unique
  createdAt: string; // ISO
  activity: string;
  feel: string;
  moduleId: number;
  videoUrl?: string;
};

const STORAGE_KEY = "rr_checkins_v1";

/**
 * Your 15 content modules (verbatim). Kept as arrays of paragraphs for clean rendering.
 */
const MODULES: Module[] = [
  {
    id: 1,
    title: "The Round Isn’t the Lesson",
    paragraphs: [
      "After rough rounds, golfers rush to conclusions. They shouldn’t.",
      "Tiger Woods used to say he never judged his game by score alone. He judged whether he committed to shots and stuck to a plan. Some of his worst-feeling rounds were statistically sound; some good scores hid bad decisions.",
      "Preparation after a round isn’t about diagnosing everything. It’s about preventing emotional overreach.",
      "When you extract ten lessons from one round, you guarantee confusion next time. When you extract one, you give yourself something to trust.",
      "Pick the moment that surprised you most—not the worst shot. That’s usually where preparation actually broke down.",
      "Everything else is noise.",
    ],
  },
  {
    id: 2,
    title: "The Range Didn’t Lie to You",
    paragraphs: [
      "The range didn’t fail you. It just asked a different question.",
      "Ben Hogan famously trusted his practice deeply—but he never expected it to replace decision-making on the course. Practice built motion. Competition demanded commitment.",
      "Range confidence often disappears on the course because targets have consequences. Preparation isn’t recreating range feels—it’s recognizing that comfort changes when outcomes matter.",
      "A good practice session gives you permission to simplify, not expand. The mistake is assuming good feels will carry you. They don’t carry. They inform.",
      "Your job on the course is to decide, then commit.",
    ],
  },
  {
    id: 3,
    title: "The First Tee Is Always Louder",
    paragraphs: [
      "Nerves on the first tee don’t mean you’re unprepared.",
      "Jack Nicklaus said he felt nervous on the first tee for most of his career. He also said nerves sharpened him—if he expected them.",
      "Prepared golfers don’t aim to feel calm. They aim to feel ready.",
      "If you wait for nerves to disappear, you give them control. If you plan for them, they fade faster.",
      "Preparation before a round is choosing one intention you’ll honor regardless of feeling.",
      "Tempo. Target. Commitment.",
      "Let the noise happen. Start anyway.",
    ],
  },
  {
    id: 4,
    title: "Good Rounds Are the Most Dangerous",
    paragraphs: [
      "The round that tempts you most isn’t the bad one. It’s the good one.",
      "Jordan Spieth has talked about how quickly confidence can turn into overreach. The urge to “build on” a good round often leads to unnecessary changes.",
      "Preparation after a strong performance means containment. Not expansion.",
      "Good rounds don’t need explanation. They need protection.",
      "The most disciplined move after playing well is to change nothing—especially emotionally.",
      "Your next round doesn’t need to improve the last one. It just needs to start clean.",
    ],
  },
  {
    id: 5,
    title: "Stop Looking for a Fix",
    paragraphs: [
      "The search for fixes usually starts when trust drops.",
      "Butch Harmon has said that most swing changes happen too close to competition—not because something is broken, but because confidence wavered.",
      "Fixing feels productive. It often isn’t.",
      "Preparation is knowing when not to adjust. Stability beats novelty under pressure.",
      "If you’re tempted to search for something new today, that’s usually a signal to narrow, not expand.",
      "Prepared golfers don’t add ideas when things feel unstable. They remove them.",
    ],
  },
  {
    id: 6,
    title: "Confidence Isn’t Something You Feel",
    paragraphs: [
      "Golfers often say, “I just need confidence.” That’s backward.",
      "Rory McIlroy has talked openly about confidence being the result of commitment—not the cause of it. It shows up after you choose something and stick with it.",
      "Waiting to feel confident before acting gives your mood control.",
      "Prepared golfers act first. Feelings follow later.",
      "Confidence isn’t a prerequisite. It’s feedback.",
      "Decide something small you’ll honor today—and honor it. That’s where confidence starts.",
    ],
  },
  {
    id: 7,
    title: "Your Miss Today Will Be Predictable",
    paragraphs: [
      "Inconsistency feels random. It rarely is.",
      "Dustin Johnson has said he always knows his most likely miss before a round. That awareness doesn’t eliminate misses—it prevents surprise.",
      "Preparation isn’t avoiding mistakes. It’s expecting them accurately.",
      "Most damage comes from reacting emotionally to a miss you didn’t plan for.",
      "Know your miss today. Accept it early. Play around it.",
      "Prepared golfers aren’t shocked by outcomes—they’ve already accounted for them.",
    ],
  },
  {
    id: 8,
    title: "Effort Does Not Equal Readiness",
    paragraphs: [
      "Trying harder isn’t the same as being ready.",
      "Brooks Koepka has been clear: his best golf comes when preparation is simple and energy is conserved—not when effort is maxed out.",
      "Excess effort tightens focus and narrows patience.",
      "Preparation is about clarity, not intensity.",
      "If today feels heavy, the solution isn’t more work. It’s less intention.",
      "One clear idea beats five forced ones.",
    ],
  },
  {
    id: 9,
    title: "Stop Making the Next Round Pay",
    paragraphs: [
      "Bad rounds create debt golfers try to collect later.",
      "Phil Mickelson has talked about how pressing after disappointment magnifies mistakes. Trying to “get it back” on the next round often compounds frustration.",
      "Prepared golfers don’t demand redemption.",
      "Every round starts clean. Every first tee owes you nothing.",
      "Preparation after a bad round means clearing emotional residue—not carrying it forward.",
      "Nothing needs to be paid back. Only prepared for.",
    ],
  },
  {
    id: 10,
    title: "Your Expectations Are Early",
    paragraphs: [
      "Progress almost always arrives later than expected.",
      "Sean Foley has said that golfers abandon good processes because results don’t appear on their timeline. Expecting early confirmation creates doubt where none is necessary.",
      "Preparation is patience applied deliberately.",
      "If you’re doing sound work and not seeing immediate payoff, that doesn’t mean you’re behind. It means you’re early.",
      "Prepared golfers stay with things long enough for results to show up.",
    ],
  },
  {
    id: 11,
    title: "Decisions Matter More Than Swings",
    paragraphs: [
      "Swings get blamed for decisions made earlier.",
      "Collin Morikawa credits much of his consistency to conservative decision-making—not perfect ball-striking.",
      "Prepared golfers separate execution from judgment.",
      "You don’t need better swings on tough days. You need better choices.",
      "Preparation means deciding where mistakes are allowed—before you make them.",
    ],
  },
  {
    id: 12,
    title: "The Feeling You’re Chasing Is Rare",
    paragraphs: [
      "Great feels are unreliable.",
      "Justin Rose has said that waiting for perfect sensation is a losing strategy. He focuses on repeatable cues instead.",
      "Prepared golfers don’t chase feelings. They trust systems.",
      "Feel comes and goes. Preparation stays.",
      "If you’re waiting for something to feel right before committing, you’re outsourcing control.",
      "Choose something stable today. Let feeling follow if it wants.",
    ],
  },
  {
    id: 13,
    title: "Nothing Is Wrong Today",
    paragraphs: [
      "Silence isn’t regression.",
      "Adam Scott has spoken about periods where he didn’t touch his swing at all—because nothing needed fixing.",
      "Prepared golfers know when to leave things alone.",
      "Not every day needs intervention. Not every thought needs action.",
      "Sometimes, preparation is restraint.",
      "Quiet days don’t erase readiness. They preserve it.",
    ],
  },
  {
    id: 14,
    title: "You’re Allowed to Play Conservatively",
    paragraphs: [
      "Aggression isn’t preparation.",
      "Zach Johnson built his career on conservative decisions and disciplined targets. Preparation doesn’t mean playing scared—it means playing smart.",
      "Prepared golfers decide where risk belongs.",
      "There’s no prize for difficulty. There’s reward for patience.",
      "Choosing conservative lines doesn’t limit your ceiling. It protects your floor.",
    ],
  },
  {
    id: 15,
    title: "Preparation Is a Narrowing",
    paragraphs: [
      "Preparation doesn’t add thoughts. It removes them.",
      "Scottie Scheffler has talked about how his focus tightens—not expands—before competition.",
      "Prepared golfers enter rounds carrying fewer ideas, not more.",
      "If your mind feels crowded, preparation hasn’t finished.",
      "Choose what matters. Let the rest go.",
      "That’s the work.",
    ],
  },
];

// YouTube mapping: start simple. Add URLs as you collect them.
// Keys are `${activity}|${feel}` matching check-in query params.
const VIDEO_MAP: Record<string, string> = {
  // Example:
  // "played|frustrated": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  // "practiced|unsure": "https://www.youtube.com/watch?v=YYYYYYYYYYY",
};

const MODULE_MAP: Record<string, number> = {
  // engagement + feeling → moduleId
  "played|frustrated": 9,
  "played|unsure": 1,
  "played|neutral": 11,
  "played|confident": 4,

  "practiced|frustrated": 5,
  "practiced|unsure": 2,
  "practiced|neutral": 15,
  "practiced|confident": 6,

  "mental|frustrated": 8,
  "mental|unsure": 3,
  "mental|neutral": 15,
  "mental|confident": 6,

  "none|frustrated": 13,
  "none|unsure": 13,
  "none|neutral": 13,
  "none|confident": 13,

  // skip handling lives below
};

function getModuleById(id: number): Module {
  return MODULES.find((m) => m.id === id) ?? MODULES[MODULES.length - 1];
}

function toKey(activity: string, feel: string) {
  return `${activity}|${feel}`;
}

function safeStr(v: string | null | undefined, fallback: string) {
  const s = (v ?? "").trim();
  return s.length ? s : fallback;
}

function isValidModuleId(v: string | null): v is string {
  if (!v) return false;
  const n = Number(v);
  return Number.isFinite(n) && n >= 1 && n <= 15;
}

export default function RecommendationPage() {
  const params = useSearchParams();
  const router = useRouter();

  const activity = safeStr(params.get("activity"), "skip");
  const feel = safeStr(params.get("feel"), "skip");

  // For “relive”, history will pass moduleId (and optional videoUrl) to replay exactly what was shown.
  const forcedModuleId = isValidModuleId(params.get("moduleId"))
    ? Number(params.get("moduleId"))
    : null;

  const forcedVideoUrl = params.get("videoUrl")?.trim() || "";

  const skipped = activity === "skip" || feel === "skip";

  const selection = useMemo(() => {
    if (forcedModuleId) {
      const module = getModuleById(forcedModuleId);
      const videoUrl = forcedVideoUrl || VIDEO_MAP[toKey(activity, feel)] || "";
      return { module, videoUrl };
    }

    if (skipped) {
      const module = getModuleById(13); // “Nothing Is Wrong Today”
      const videoUrl = "";
      return { module, videoUrl };
    }

    const key = toKey(activity, feel);
    const moduleId = MODULE_MAP[key] ?? 15; // default narrowing
    const module = getModuleById(moduleId);
    const videoUrl = VIDEO_MAP[key] ?? "";
    return { module, videoUrl };
  }, [activity, feel, forcedModuleId, forcedVideoUrl, skipped]);

  // Log once per visit for this exact output (unless it's a relive open)
  useEffect(() => {
    const relive = params.get("relive") === "1";
    if (relive) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: LogEntry[] = raw ? JSON.parse(raw) : [];

      const nowIso = new Date().toISOString();
      const moduleId = selection.module.id;
      const videoUrl = selection.videoUrl || undefined;

      // Prevent accidental duplicates if user refreshes quickly
      const signature = `${activity}|${feel}|${moduleId}|${videoUrl ?? ""}`;
      const last = list[0];
      if (last) {
        const lastSig = `${last.activity}|${last.feel}|${last.moduleId}|${last.videoUrl ?? ""}`;
        if (lastSig === signature) return;
      }

      const entry: LogEntry = {
        id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        createdAt: nowIso,
        activity,
        feel,
        moduleId,
        ...(videoUrl ? { videoUrl } : {}),
      };

      const next = [entry, ...list].slice(0, 180); // keep last ~6 months max
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // no-op for MVP
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, feel, selection.module.id, selection.videoUrl]);

  const activityLabel = skipped ? "Skipped" : activity;
  const feelLabel = skipped ? "Skipped" : feel;

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
      <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#5f5f5f",
            marginBottom: 10,
          }}
        >
          Today’s Focus
        </div>

        <h1
          style={{
            fontSize: 30,
            margin: "0 0 10px",
            fontWeight: 700,
            color: "#1b1b1b",
          }}
        >
          {selection.module.title}
        </h1>

        <p
          style={{
            margin: 0,
            color: "#555555",
            lineHeight: 1.65,
            fontSize: 16,
          }}
        >
          One idea. Carry less.
        </p>

        <div
          style={{
            marginTop: 14,
            display: "inline-flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#6a6a6a",
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.65)",
            }}
          >
            Engagement: {activityLabel}
          </span>

          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#6a6a6a",
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.65)",
            }}
          >
            Feeling: {feelLabel}
          </span>
        </div>
      </div>

      {/* Read */}
      <div
        style={{
          marginTop: 22,
          borderRadius: 18,
          border: "1px solid rgba(0,0,0,0.10)",
          background: "#ffffff",
          boxShadow: "0 10px 22px rgba(0,0,0,0.06)",
          padding: "22px 20px",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#6a6a6a",
            marginBottom: 12,
          }}
        >
          Short Read
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {selection.module.paragraphs.map((p, idx) => (
            <p
              key={idx}
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#2b2b2b",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Optional video */}
      {selection.videoUrl ? (
        <div
          style={{
            marginTop: 16,
            borderRadius: 18,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "rgba(255,255,255,0.75)",
            boxShadow: "0 10px 22px rgba(0,0,0,0.06)",
            padding: "18px 18px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#6a6a6a",
              marginBottom: 10,
            }}
          >
            Optional Video
          </div>

          <p
            style={{
              margin: "0 0 12px",
              fontSize: 16,
              lineHeight: 1.6,
              color: "#555555",
            }}
          >
            If you want a 60–90 second reinforcement.
          </p>

          <a
            href={selection.videoUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#ffb0e7",
              color: "#141414",
              textDecoration: "none",
              borderRadius: 14,
              padding: "14px 16px",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "0.02em",
              boxShadow: "0 8px 18px rgba(255,176,231,0.35)",
            }}
          >
            Watch on YouTube
          </a>
        </div>
      ) : null}

      {/* Actions */}
      <div
        style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            background: "#ffb0e7",
            color: "#141414",
            border: "none",
            borderRadius: 16,
            padding: "18px 20px",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "0.02em",
            cursor: "pointer",
            boxShadow: "0 10px 22px rgba(255,176,231,0.35)",
          }}
        >
          Done
        </button>

        <Link
          href="/history"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            color: "#1b1b1b",
            border: "1px solid rgba(0,0,0,0.22)",
            borderRadius: 16,
            padding: "18px 20px",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Relive Past
        </Link>
      </div>

      <p
        style={{
          margin: "16px 0 0",
          textAlign: "center",
          fontSize: 13,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "#777777",
        }}
      >
        Better Prepared Golfers
      </p>

      <style>{`
        @media (max-width: 720px) {
          .rr-actions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
