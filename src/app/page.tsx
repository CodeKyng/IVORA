"use client"

import dynamic from "next/dynamic"

const CinematicLanding = dynamic(() => import("@/components/CinematicLanding"), {
  ssr: false,
  loading: () => (
    <div className="iv-loading">
      <p>Loading IVORA…</p>
    </div>
  ),
})

export default function Home() {
  return <CinematicLanding />
}
