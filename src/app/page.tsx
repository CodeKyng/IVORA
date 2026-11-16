"use client"

import dynamic from "next/dynamic"

const OrielStudioTemplate = dynamic(
  () => import("@/components/ui/oriel-studio-template"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "100svh",
          background: "#07080f",
          display: "grid",
          placeItems: "center",
          color: "#c4b5fd",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ letterSpacing: "0.08em", fontSize: "0.85rem", opacity: 0.8 }}>
          Loading IVORA…
        </p>
      </div>
    ),
  }
)

export default function Home() {
  return (
    <main className="w-full min-h-svh bg-[#07080f]">
      <OrielStudioTemplate
        brand="IVORA"
        headline="Stop losing hours to manual work. Automate the operations that slow you down."
        email="hello@ivora.systems"
        theme="dark"
        height="100svh"
        fontHref="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Inter+Tight:wght@300..800&display=swap"
      />
    </main>
  )
}
