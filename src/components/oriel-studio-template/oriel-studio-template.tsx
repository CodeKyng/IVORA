"use client"

/**
 * Temporary stub.
 * The full cinematic Oriel template previously contained residual design-studio
 * copy (Brand systems / Product design / Motion & 3D). The live page now uses
 * CinematicLanding.tsx which has correct IVORA automation messaging.
 *
 * Do not import this for production until the full template is restored with
 * automation-only copy.
 */

export default function OrielStudioTemplate() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        background: "#0b0b0c",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ opacity: 0.6, letterSpacing: "0.08em", fontSize: "0.75rem" }}>IVORA</p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 500, margin: "0.5rem 0 1rem" }}>
          Cinematic template temporarily offline
        </h1>
        <p style={{ opacity: 0.7, maxWidth: 360, margin: "0 auto", lineHeight: 1.5 }}>
          The live site uses the correct automation landing page.
          This file is a placeholder while residual design-studio content is fully removed.
        </p>
      </div>
    </div>
  )
}
