export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import RecommendationClient from "./RecommendationClient";

export default function RecommendationPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 16px",
            color: "#2b2b2b",
          }}
        >
          Loading…
        </div>
      }
    >
      <RecommendationClient />
    </Suspense>
  );
}
