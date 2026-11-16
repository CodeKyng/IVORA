"use client"

import dynamic from "next/dynamic"

const OrielStudioTemplate = dynamic(
  () => import("@/components/OrielStudioTemplate"),
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
  return (
    <OrielStudioTemplate
      brand="IVORA"
      headline="Stop losing hours to manual work. Automate the operations that slow you down."
      email="hello@ivora.systems"
      theme="light"
      height="100svh"
    />
  )
}
