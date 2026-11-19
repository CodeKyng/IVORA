"use client"

import dynamic from "next/dynamic"

const CinematicLanding = dynamic(
  () => import("@/components/CinematicLanding"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          background: "#ffffff",
          color: "#0b0b0c",
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "0.06em",
          fontSize: "0.85rem",
        }}
      >
        <p>Loading…</p>
      </div>
    ),
  }
)

export default function Home() {
  return <CinematicLanding />
}
