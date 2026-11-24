"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "build", label: "Build" },
  { id: "who", label: "Who" },
  { id: "belief", label: "Belief" },
  { id: "outcomes", label: "Outcomes" },
  { id: "process", label: "Process" },
  { id: "waitlist", label: "Waitlist" },
] as const

export default function CinematicLanding() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [sent, setSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".iv-scene")
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section, start: "top center", end: "bottom center",
          onEnter: () => setActive(i), onEnterBack: () => setActive(i),
        })
        gsap.fromTo(section.querySelectorAll("[data-rise]"), { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none reverse" },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const go = (i: number) => {
    document.getElementById(SCENES[i].id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <div ref={rootRef} className="iv-root">
      <header className="iv-header">
        <button type="button" className="iv-brand" onClick={() => go(0)} aria-label="IVORA home">
          <span className="iv-mark" aria-hidden />IVORA
        </button>
        <nav className="iv-nav" aria-label="Sections">
          {SCENES.map((s, i) => (
            <button key={s.id} type="button" className={active === i ? "is-on" : ""} onClick={() => go(i)}>{s.label}</button>
          ))}
        </nav>
        <button type="button" className="iv-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span /><span />
        </button>
      </header>
      {menuOpen && (
        <div className="iv-menu" role="dialog" aria-label="Menu">
          {SCENES.map((s, i) => (
            <button key={s.id} type="button" onClick={() => go(i)}>{s.label}</button>
          ))}
        </div>
      )}

      <section className="iv-scene" id="home">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Business Automation Systems</p>
          <h1 data-rise>Stop losing hours to manual work. <span className="iv-accent">Automate the operations that slow you down.</span></h1>
          <p className="iv-lead" data-rise>IVORA designs and builds custom automation systems — connecting tools, eliminating repetitive tasks, and giving you cleaner, faster operations.</p>
          <div className="iv-ctas" data-rise>
            <button type="button" className="iv-btn p" onClick={() => go(7)}>Join the waitlist</button>
            <button type="button" className="iv-btn g" onClick={() => go(6)}>See the process</button>
          </div>
          <div className="iv-stats" data-rise>
            <div><strong>10–20h</strong><span>saved per week</span></div>
            <div><strong>Fewer errors</strong><span>in data and follow-ups</span></div>
            <div><strong>Faster leads</strong><span>response and handoff</span></div>
          </div>
        </div>
      </section>

      <section className="iv-scene" id="problem">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>The cost of manual work</p>
          <h2 data-rise>Manual processes quietly drain time and revenue</h2>
          <div className="iv-grid">
            {[
              ["Hours lost every week", "Copy-pasting data, chasing updates, and rebuilding the same reports keeps skilled people stuck in admin."],
              ["Disconnected tools", "CRM, email, spreadsheets, and support systems do not talk to each other."],
              ["Human error and delays", "Manual data entry creates mistakes and slow response times."],
              ["Hard to scale", "Growing volume without automation means hiring for the same repetitive work."],
            ].map(([t, b]) => (
              <article key={t} className="iv-card" data-rise><h3>{t}</h3><p>{b}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="build">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>What we build</p>
          <h2 data-rise>Automation systems tailored to how your business runs</h2>
          <ul className="iv-services">
            {["Workflow automation", "CRM automation", "AI chat and support flows", "Data integrations", "Reporting dashboards", "Custom API integrations"].map((s) => (
              <li key={s} data-rise><span className="iv-dot" />{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="iv-scene" id="who">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Who we help</p>
          <h2 data-rise>Automation that fits your type of business</h2>
          <div className="iv-chips">
            {["Agencies", "Ecommerce", "Consultants and coaches", "Real estate", "Healthcare admin", "SaaS and service businesses"].map((a) => (
              <span key={a} className="iv-chip" data-rise>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene iv-belief" id="belief">
        <div className="iv-inner" style={{ maxWidth: 720 }}>
          <p className="iv-eyebrow" data-rise>Belief</p>
          <blockquote data-rise>Reliable systems beat heroic effort. Automate the work that should never have been manual.</blockquote>
        </div>
      </section>

      <section className="iv-scene" id="outcomes">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Outcomes</p>
          <h2 data-rise>What reliable automation delivers</h2>
          <div className="iv-metrics">
            {[
              ["10–20+", "hours / week", "Reclaimed from repetitive admin"],
              ["Faster", "lead response", "Minutes instead of hours"],
              ["Fewer", "manual errors", "Structured data flow"],
              ["Clearer", "visibility", "Live dashboards, not spreadsheets"],
            ].map(([m, u, n]) => (
              <div key={u} className="iv-metric" data-rise><b>{m}</b><em>{u}</em><p>{n}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="process">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Process</p>
          <h2 data-rise>How IVORA works</h2>
          <div className="iv-steps">
            {[
              ["01", "Audit", "Map the processes that cost the most time and risk."],
              ["02", "Build", "Design and implement automations, integrations, and safeguards."],
              ["03", "Optimise", "Monitor, refine edge cases, and hand over runbooks."],
            ].map(([n, t, b]) => (
              <div key={n} className="iv-step" data-rise><span>{n}</span><h3>{t}</h3><p>{b}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="waitlist">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Early access</p>
          <h2 data-rise>Join the waitlist for custom automation systems</h2>
          <p className="iv-lead" data-rise>Tell us about the processes that cost you the most time. We will reach out when capacity opens.</p>
          {!sent ? (
            <form className="iv-form" data-rise onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <label>Name<input name="name" required placeholder="Your name" /></label>
              <label>Work email<input name="email" type="email" required placeholder="you@company.com" /></label>
              <label>Company<input name="company" placeholder="Optional" /></label>
              <label>What do you want to automate?<textarea name="challenge" rows={3} placeholder="e.g. lead follow-up, reporting" /></label>
              <button type="submit" className="iv-btn p f">Join the waitlist</button>
            </form>
          ) : (
            <div className="iv-ok" data-rise>
              <h3 style={{ margin: "0 0 .4rem" }}>You are on the list</h3>
              <p style={{ margin: 0, color: "var(--mute)" }}>Thanks — we will be in touch when capacity opens.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="iv-foot">
        <strong style={{ color: "var(--ink)" }}>IVORA</strong>
        <p>© {new Date().getFullYear()} IVORA. Custom automation systems.</p>
      </footer>
    </div>
  )
}
