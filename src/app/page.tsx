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

const PROJECTS = [
  {
    name: "Lead response",
    kind: "CRM automation",
    year: "Minutes",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Weekly reports",
    kind: "Dashboard sync",
    year: "10h saved",
    img: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Client onboarding",
    kind: "Workflow system",
    year: "Agencies",
    img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Support triage",
    kind: "AI assist flows",
    year: "Faster",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Order status",
    kind: "Ecommerce ops",
    year: "Realtime",
    img: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Pipeline hygiene",
    kind: "Data integrations",
    year: "Cleaner",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    name: "Follow-up sequences",
    kind: "Revenue ops",
    year: "Reliable",
    img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
]

export default function Home() {
  return (
    <OrielStudioTemplate
      brand="IVORA"
      headline="Stop losing hours to manual work. Automate the operations that slow you down."
      email="hello@ivora.systems"
      theme="light"
      height="100svh"
      projects={PROJECTS}
    />
  )
}
