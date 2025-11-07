import React, { useMemo, useState } from "react";
import emailjs from "emailjs-com";

// --- Single-file, drop-in portfolio page ---
// How to use:
// 1) Put this file in your React app (e.g., src/Portfolio.jsx) and import <Portfolio /> in App.jsx.
// 2) Edit the 'PROFILE', 'TABS', and 'PROJECTS' data below with your info.
// 3) Tailwind CSS recommended for styling. (Works well with Tailwind v4.)

const PROFILE = {
  name: "Your Name",
  role: "Full‑Stack Developer",
  blurb:
    "I build fast, clean, and reliable web apps. Focused on DX, performance, and shipping value.",
  location: "City, Country",
  availability: "Open to freelance & full‑time",
  email: "you@example.com",
  resumeUrl: "#", // paste Google Drive/Notion/CV link here
  socials: [
    { label: "GitHub", href: "https://github.com/yourhandle" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
    { label: "X/Twitter", href: "https://x.com/yourhandle" },
  ],
};

// You asked for “projects + 3 generic tabs”. Rename labels freely.
const TABS = [
  { key: "projects", label: "Projects" },
  { key: "about", label: "About" },
  { key: "experience", label: "Experience" },
  { key: "contact", label: "Contact" },
];

// Edit your projects here.
const PROJECTS = [
  {
    title: "SaaS Billing Dashboard",
    description:
      "A Stripe‑powered dashboard with MRR, churn, cohort analysis, and webhook‑driven ledger.",
    stack: ["React", "Node", "Postgres", "Stripe"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    title: "Realtime Chat",
    description:
      "WebSocket chat with presence, optimistic UI, and end‑to‑end encryption demo.",
    stack: ["React", "Express", "Redis", "WS"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    title: "Image Optimizer",
    description:
      "On‑the‑fly image CDN with smart cropping, AVIF/WEBP conversion, and cache layering.",
    stack: ["React", "Cloudflare", "KV", "Workers"],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function SectionCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border bg-white/70 p-6 shadow-sm ${className}`}>{children}</div>
  );
}

function Tabs({ active, onChange }) {
  return (
    <div className="-mb-px flex gap-1 overflow-x-auto rounded-xl border bg-white/70 p-1">
      {TABS.map((t) => {
        const selected = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:bg-black/5 focus:outline-none ${
              selected ? "bg-black text-white" : "bg-transparent text-gray-700"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("projects");

  const activeIndex = useMemo(() => TABS.findIndex((t) => t.key === active), [active]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_zhti80e",
        "template_pbfme4i",
        e.target,
        "a0tMaffijigeAHNJI"
      )
      .then(() => {
        alert("Message sent successfully!");
        e.target.reset();
      })
      .catch((err) => {
        alert("Error: " + err.text);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-tr from-gray-900 to-gray-600" />
            <div>
              <h1 className="text-xl font-bold leading-tight">{PROFILE.name}</h1>
              <p className="text-sm text-gray-600">{PROFILE.role}</p>
            </div>
          </div>
          <nav className="hidden md:block">
            <div className="flex gap-2">
              {PROFILE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-black hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-4">
          <Tabs active={active} onChange={setActive} />
        </div>
        {/* Animated underline indicator */}
        <div className="mx-auto hidden h-1 max-w-5xl md:block">
          <div
            className="h-1 w-1/4 bg-black transition-all"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        {active === "projects" && (
          <section className="space-y-6">
            <SectionCard>
              <h2 className="mb-2 text-2xl font-bold">Featured Projects</h2>
              <p className="text-gray-600">A few things I’ve shipped recently.</p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {PROJECTS.map((p, idx) => (
                <SectionCard key={idx} className="flex flex-col gap-4">
                  <div className="h-36 w-full rounded-xl bg-gradient-to-tr from-gray-200 to-gray-100" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.stack.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="rounded-lg border px-3 py-1.5 text-sm font-semibold hover:bg-black hover:text-white"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </SectionCard>
              ))}
            </div>
          </section>
        )}

        {active === "about" && (
          <section className="space-y-6">
            <SectionCard>
              <h2 className="mb-2 text-2xl font-bold">About</h2>
              <p className="text-gray-700">
                {PROFILE.blurb}
              </p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <SectionCard>
                <div className="text-sm text-gray-600">Location</div>
                <div className="text-lg font-semibold">{PROFILE.location}</div>
              </SectionCard>
              <SectionCard>
                <div className="text-sm text-gray-600">Availability</div>
                <div className="text-lg font-semibold">{PROFILE.availability}</div>
              </SectionCard>
              <SectionCard>
                <div className="text-sm text-gray-600">Primary Stack</div>
                <div className="text-lg font-semibold">React • Node • Postgres</div>
              </SectionCard>
            </div>
          </section>
        )}

        {active === "experience" && (
          <section className="space-y-6">
            <SectionCard>
              <h2 className="mb-2 text-2xl font-bold">Experience</h2>
              <p className="text-gray-600">Replace with your timeline.</p>
            </SectionCard>

            <div className="space-y-4">
              {[{
                role: "Senior Developer — Acme Corp",
                period: "2023 — Present",
                bullets: [
                  "Led migration to React Server Components, improving TTFB by 32%.",
                  "Built internal component library adopted by 5 teams.",
                ],
              },
              {
                role: "Full‑Stack — StartUp XYZ",
                period: "2021 — 2023",
                bullets: [
                  "Shipped subscription analytics with Stripe + Postgres window functions.",
                  "Reduced infra costs by 45% with better caching and query plans.",
                ],
              }].map((item, i) => (
                <SectionCard key={i}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <div className="text-sm text-gray-600">{item.period}</div>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                    {item.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </SectionCard>
              ))}
            </div>
          </section>
        )}

        {active === "contact" && (
          <section className="space-y-6">
            <SectionCard>
              <h2 className="mb-2 text-2xl font-bold">Contact</h2>
              <p className="text-gray-700">
                Let's talk about your project, collaboration, or role. I usually reply within 24 hours.
              </p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <SectionCard>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <a href={`mailto:${PROFILE.email}`} className="text-lg font-semibold underline">
                      {PROFILE.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Resume</div>
                    <a href={PROFILE.resumeUrl} className="text-lg font-semibold underline">
                      View CV
                    </a>
                  </div>
                </div>
              </SectionCard>

              <SectionCard>
                <form onSubmit={sendEmail} className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <input name="name" required className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input name="from" type="email" required className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Message</label>
                    <textarea name="message" rows={4} required className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none" />
                  </div>
                  <button type="submit" className="rounded-xl bg-black px-4 py-2 font-semibold text-white hover:opacity-90">
                    Send
                  </button>
                </form>
              </SectionCard>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
      </footer>
    </div>
  );
}
