"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { id: "home", label: "Home" },
  { id: "what", label: "What we do" },
  { id: "how", label: "How we do it" },
  { id: "flow", label: "Your journey" },
  { id: "products", label: "Automations" },
  { id: "outcomes", label: "Results" },
  { id: "order", label: "Get started" },
] as const

const WHAT = [
  ["Lead & CRM automation", "Capture, qualify, route, and follow up leads automatically across forms, CRM, email, and chat."],
  ["Ops & admin workflows", "Replace copy-paste, status chasing, and spreadsheet rebuilds with reliable scheduled and event-driven flows."],
  ["Support & inbox systems", "Auto-tag, triage, and respond to common requests so humans only handle judgment calls."],
  ["Billing & finance ops", "Invoice creation, payment reminders, reconciliation hooks, and finance tool sync."],
  ["Reporting dashboards", "Live operational views instead of weekly manual reports from five different tools."],
  ["Custom integrations", "Connect the stack you already use — CRM, payments, support, spreadsheets, and internal APIs."],
]

const HOW = [
  ["01", "Discover", "We map the exact process costing you time or revenue, including tools, handoffs, and failure points."],
  ["02", "Design", "We define triggers, rules, edge cases, and ownership so the automation is safe and maintainable."],
  ["03", "Build", "We implement, test, and document the system in your tools — not a black-box demo environment."],
  ["04", "Launch", "Go-live with monitoring, handoff notes, and a clear runbook for your team."],
  ["05", "Improve", "We refine based on real runs until the system is stable and the ROI is visible."],
]

const FLOW = [
  ["1", "Choose", "Pick a packaged automation or request a custom build from the catalog."],
  ["2", "Pay", "Secure checkout on the platform. Scope and delivery window are confirmed up front."],
  ["3", "Onboard", "Share tool access, sample data, and process notes through a guided intake."],
  ["4", "Build", "IVORA configures, tests, and documents the automation in your environment."],
  ["5", "Deliver", "You receive a live system, runbook, and ownership handoff — ready for daily use."],
]

const PRODUCTS = [
  ["Lead Router", "From form or inbox → qualified lead in CRM with owner assignment and first follow-up.", "From $1,500"],
  ["Follow-up Engine", "Timed email/SMS sequences with stop rules when a human replies or a deal moves.", "From $1,200"],
  ["Invoice Nudger", "Auto-create and chase unpaid invoices with status sync back to your finance tools.", "From $1,000"],
  ["Support Triage", "Tag, prioritize, and draft replies for common tickets before an agent steps in.", "From $1,800"],
  ["Ops Sync Hub", "Keep CRM, sheets, and internal tools aligned without nightly copy-paste.", "From $2,200"],
  ["Custom System", "Full process automation designed around your stack and edge cases.", "Scoped quote"],
]

export default function CinematicLanding() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [sent, setSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [product, setProduct] = useState("Lead Router")

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

  const orderProduct = (name: string) => {
    setProduct(name)
    go(6)
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
          <p className="iv-eyebrow" data-rise>Custom business automation — sold and delivered on platform</p>
          <h1 data-rise>We build and sell the automations that run your operations.</h1>
          <p className="iv-lead" data-rise>
            IVORA designs, builds, and hands over working automation systems — lead routing, follow-ups, billing ops, support triage, and tool integrations — so your team stops doing the same manual work every week.
          </p>
          <div className="iv-ctas" data-rise>
            <button type="button" className="iv-btn p" onClick={() => go(4)}>Browse automations</button>
            <button type="button" className="iv-btn g" onClick={() => go(3)}>See purchase → delivery</button>
          </div>
          <div className="iv-stats" data-rise>
            <div><strong>What we sell</strong><span>Ready packages + custom builds</span></div>
            <div><strong>How we deliver</strong><span>Discover → build → handoff</span></div>
            <div><strong>Where it lives</strong><span>In your tools, owned by you</span></div>
          </div>
        </div>
      </section>

      <section className="iv-scene" id="what">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>What we do</p>
          <h2 data-rise>We sell automation systems that replace repetitive work</h2>
          <p className="iv-lead" data-rise>
            Not software licenses. Not advice-only. Working systems configured in your stack, documented, and ready for daily use.
          </p>
          <div className="iv-grid">
            {WHAT.map(([t, b]) => (
              <article key={t} className="iv-card" data-rise>
                <h3>{t}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="how">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>How we do it</p>
          <h2 data-rise>A fixed method so every automation ships clean</h2>
          <div className="iv-steps iv-steps-5">
            {HOW.map(([n, t, b]) => (
              <div key={n} className="iv-step" data-rise>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="flow">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>From purchase to end</p>
          <h2 data-rise>Your path from order to a live automation</h2>
          <p className="iv-lead" data-rise>
            The platform is built to sell automations end-to-end — choose, pay, onboard, build, deliver.
          </p>
          <div className="iv-flow" data-rise>
            {FLOW.map(([n, t, b], i) => (
              <div key={n} className="iv-flow-item">
                <div className="iv-flow-n">{n}</div>
                <div>
                  <h3>{t}</h3>
                  <p>{b}</p>
                </div>
                {i < FLOW.length - 1 && <span className="iv-flow-arrow" aria-hidden>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="products">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Automation catalog</p>
          <h2 data-rise>Buy an automation. We build and deliver it.</h2>
          <div className="iv-products">
            {PRODUCTS.map(([name, desc, price]) => (
              <article key={name} className="iv-product" data-rise>
                <div className="iv-product-top">
                  <h3>{name}</h3>
                  <span className="iv-price">{price}</span>
                </div>
                <p>{desc}</p>
                <button type="button" className="iv-btn p" onClick={() => orderProduct(name)}>Order this</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="outcomes">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Results</p>
          <h2 data-rise>What a delivered automation is worth</h2>
          <div className="iv-metrics">
            {[
              ["10–20+", "hours / week", "Back from repetitive admin"],
              ["Minutes", "not hours", "Lead response and handoff"],
              ["Fewer", "manual errors", "Structured data flow"],
              ["Yours", "to own", "Runbooks + system in your tools"],
            ].map(([m, u, n]) => (
              <div key={u} className="iv-metric" data-rise>
                <b>{m}</b><em>{u}</em><p>{n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iv-scene" id="order">
        <div className="iv-inner">
          <p className="iv-eyebrow" data-rise>Get started</p>
          <h2 data-rise>Order an automation or request a custom build</h2>
          <p className="iv-lead" data-rise>
            Tell us what you need. We confirm scope, timeline, and checkout so delivery can start.
          </p>
          {!sent ? (
            <form
              className="iv-form"
              data-rise
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <label>Name<input name="name" required placeholder="Your name" /></label>
              <label>Work email<input name="email" type="email" required placeholder="you@company.com" /></label>
              <label>Company<input name="company" placeholder="Optional" /></label>
              <label>
                Automation
                <select name="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                  {PRODUCTS.map(([name]) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </label>
              <label>What should this automation handle?<textarea name="scope" rows={3} placeholder="e.g. website leads → CRM + first email within 5 minutes" /></label>
              <button type="submit" className="iv-btn p f">Request order</button>
            </form>
          ) : (
            <div className="iv-ok" data-rise>
              <h3 style={{ margin: "0 0 .4rem" }}>Request received</h3>
              <p style={{ margin: 0, color: "var(--mute)" }}>
                We will confirm scope, pricing, and next steps for <strong>{product}</strong> shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="iv-foot">
        <strong style={{ color: "var(--ink)" }}>IVORA</strong>
        <p>© {new Date().getFullYear()} IVORA. Automations sold and delivered on platform.</p>
      </footer>
    </div>
  )
}
