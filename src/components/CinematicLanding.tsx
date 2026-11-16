"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "build", label: "What we build" },
  { id: "who", label: "Who we help" },
  { id: "belief", label: "Belief" },
  { id: "outcomes", label: "Outcomes" },
  { id: "proof", label: "Proof" },
  { id: "process", label: "Process" },
  { id: "waitlist", label: "Waitlist" },
] as const

const PROBLEMS = [
  { title: "Hours lost every week", body: "Copy-pasting data, chasing updates, and rebuilding the same reports keeps skilled people stuck in admin." },
  { title: "Disconnected tools", body: "CRM, email, spreadsheets, and support systems do not talk to each other. Follow-ups fall through the cracks." },
  { title: "Human error & delays", body: "Manual data entry creates mistakes, slow response times, and an uneven customer experience." },
  { title: "Hard to scale", body: "Growing volume without automation means hiring for the same repetitive work — or accepting lower quality." },
]

const SERVICES = [
  "Workflow automation",
  "CRM automation",
  "AI chat & support flows",
  "Data integrations",
  "Reporting dashboards",
  "Custom API integrations",
]

const AUDIENCES = [
  "Agencies",
  "Ecommerce",
  "Consultants & coaches",
  "Real estate",
  "Healthcare admin",
  "SaaS & service businesses",
]

const OUTCOMES = [
  { metric: "10–20+", unit: "hours / week", note: "Reclaimed from repetitive admin" },
  { metric: "Faster", unit: "lead response", note: "Minutes instead of hours" },
  { metric: "Fewer", unit: "manual errors", note: "Structured data flow" },
  { metric: "Clearer", unit: "visibility", note: "Live dashboards, not spreadsheets" },
]

const STEPS = [
  { n: "01", title: "Audit", body: "Map the processes that cost the most time and risk. Identify high-ROI automation opportunities." },
  { n: "02", title: "Build", body: "Design and implement automations, integrations, and safeguards — documented for reliability." },
  { n: "03", title: "Optimise", body: "Monitor, refine edge cases, and hand over runbooks so your team can own the systems." },
]

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
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
        gsap.fromTo(
          section.querySelectorAll("[data-rise]"),
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        )
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
        <button type="button" className="iv-brand" onClick={() => go(0)}>
          <img src="/logo.jpg" alt="IVORA" width={120} height={32} />
        </button>
        <nav className="iv-nav desktop">
          {SCENES.map((s, i) => (
            <button key={s.id} type="button" className={active === i ? "is-on" : ""} onClick={() => go(i)}>
              {s.label}
            </button>
          ))}
        </nav>
        <button type="button" className="iv-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          <span /><span />
        </button>
      </header>

      {menuOpen && (
        <div className="iv-menu">
          {SCENES.map((s, i) => (
            <button key={s.id} type="button" onClick={() => go(i)}>
              <span className="iv-menu-n">{String(i + 1).padStart(2, "0")}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}

      <section className="iv-scene iv-home" id="home">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Business Automation Systems</p>
          <h1 data-rise>
            Stop losing hours to manual work.
            <span className="iv-accent"> Automate the operations that slow you down.</span>
          </h1>
          <p className="iv-lead" data-rise>
            IVORA designs and builds custom automation systems — connecting tools, eliminating repetitive tasks, and giving you cleaner, faster operations.
          </p>
          <div className="iv-ctas" data-rise>
            <button type="button" className="iv-btn primary" onClick={() => go(8)}>Join the waitlist</button>
            <button type="button" className="iv-btn ghost" onClick={() => go(7)}>See the process</button>
          </div>
          <div className="iv-stats" data-rise>
            <div><strong>10–20h</strong><span>saved per week</span></div>
            <div><strong>Fewer errors</strong><span>in data & follow-ups</span></div>
            <div><strong>Faster leads</strong><span>response & handoff</span></div>
          </div>
        </div>
        <div className="iv-scroll-hint" aria-hidden>Scroll</div>
      </section>

      <section className="iv-scene" id="problem">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>The cost of manual work</p>
          <h2 data-rise>Manual processes quietly drain time and revenue</h2>
          <div className="iv-grid-2">
            {PROBLEMS.map((p) => (
              <article key={p.title} className="iv-card" data-rise>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="build">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>What we build</p>
          <h2 data-rise>Automation systems tailored to how your business actually runs</h2>
          <ul className="iv-services">
            {SERVICES.map((s) => (
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
            {AUDIENCES.map((a) => (
              <span key={a} className="iv-chip" data-rise>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene iv-belief" id="belief">
        <div className="iv-inner narrow">
          <p className="iv-eyebrow" data-rise>Belief</p>
          <blockquote data-rise>
            Reliable systems beat heroic effort. Automate the work that should never have been manual.
          </blockquote>
        </div>
      </section>

      <section className="iv-scene" id="outcomes">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Outcomes</p>
          <h2 data-rise>What reliable automation delivers</h2>
          <div className="iv-grid-4">
            {OUTCOMES.map((o) => (
              <div key={o.unit} className="iv-metric" data-rise>
                <span className="iv-metric-v">{o.metric}</span>
                <span className="iv-metric-u">{o.unit}</span>
                <p>{o.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="proof">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Proof</p>
          <h2 data-rise>Built for teams that run on tools</h2>
          <div className="iv-proof-row" data-rise>
            {["CRM systems", "Email & calendars", "Spreadsheets", "Payment tools", "Support desks", "Internal APIs"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="process">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Process</p>
          <h2 data-rise>How IVORA works</h2>
          <div className="iv-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="iv-step" data-rise>
                <span className="iv-step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene iv-waitlist" id="waitlist">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Early access</p>
          <h2 data-rise>Join the waitlist for custom automation systems</h2>
          <p className="iv-lead" data-rise>
            Tell us about the processes that cost you the most time. We&apos;ll reach out when capacity opens.
          </p>
          {!sent ? (
            <form className="iv-form" data-rise onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <label>Name<input name="name" required placeholder="Your name" /></label>
              <label>Work email<input name="email" type="email" required placeholder="you@company.com" /></label>
              <label>Company<input name="company" placeholder="Optional" /></label>
              <label>What do you want to automate?<textarea name="challenge" rows={3} placeholder="e.g. lead follow-up, reporting…" /></label>
              <button type="submit" className="iv-btn primary full">Join the waitlist</button>
            </form>
          ) : (
            <div className="iv-success" data-rise>
              <h3>You&apos;re on the list</h3>
              <p>Thanks — we&apos;ll be in touch when capacity opens for new automation builds.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="iv-foot">
        <img src="/logo.jpg" alt="" width={100} height={28} />
        <p>© {new Date().getFullYear()} IVORA. Custom automation systems.</p>
      </footer>
    </div>
  )
}
