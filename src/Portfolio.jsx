import React, { useMemo, useState, useEffect } from "react";
import emailjs from "emailjs-com";

// --- Single-file, drop-in portfolio page ---
// How to use:
// 1) Put this file in your React app (e.g., src/Portfolio.jsx) and import <Portfolio /> in App.jsx.
// 2) Edit the 'PROFILE', 'TABS', and 'PROJECTS' data below with your info.
// 3) Tailwind CSS recommended for styling. (Works well with Tailwind v4.)

const PROFILE = {
  name: "Aaroh Bhardwaj",
  role: "Full Stack Developer",
  tagline: "Building reliable digital experiences with clean, scalable code.",
  blurb:
    "Full Stack Developer specializing in the JavaScript ecosystem. I engineer scalable, end-to-end solutions using modern stacks like Next.js, React, Node.js, and MongoDB. I focus on building performant, full-cycle applications—from architecting robust back-end APIs to crafting dynamic, responsive front-end interfaces.",
  location: "Bengaluru, India",
  availability: "Open to freelance & full‑time",
  email: "aarohb.1507@gmail.com",
  resumeUrl: "#", // paste Google Drive/Notion/CV link here
  socials: [
    { label: "GitHub", href: "https://github.com/aarohb1507" },
    { label: "LinkedIn", href: "https://linkedin.com/in/aaroh-bhardwaj" },
  ],
  skills: [
    "JavaScript", "TypeScript", "C++", "Java", "React", "Next.js", 
    "Node.js", "Express", "NestJS", "Redux", "MongoDB", "Tailwind CSS", 
    "Docker", "Cloudinary", "Postman", "Figma", "Git"
  ],
  education: {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Acharya Institute of Technology, Bengaluru",
    year: "Expected 2026"
  }
};

// You asked for "projects + 3 generic tabs". Rename labels freely.
const TABS = [
  { key: "projects", label: "Projects" },
  { key: "about", label: "About" },
  { key: "experience", label: "Experience" },
  { key: "contact", label: "Contact" },
];

// Edit your projects here.
const PROJECTS = [
  {
    title: "eLibrary REST API",
    description:
      "RESTful API for managing books, users, and admins with JWT auth, role-based access, Cloudinary integration, and analytics.",
    stack: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    image: "/rest-api.png",
    links: [
      { label: "GitHub", href: "https://github.com/aarohb1507/e-library-api" },
    ],
  },
  {
  title: "Employee Task Management System",
  description:
    "Task dashboards, progress tracking, role-based access, and responsive UI using Tailwind CSS.",
  stack: ["React", "Redux", "Node.js", "Express", "MongoDB"],
  image: "/ems.png", // ✅ added this line
  links: [
    { label: "GitHub", href: "https://github.com/aarohb1507/task-management-system" },
  ],
},

];

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border dark:border-gray-600 px-2.5 py-1 text-xs font-medium dark:text-gray-300">
      {children}
    </span>
  );
}

function SectionCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border bg-white/70 dark:bg-gray-800/70 dark:border-gray-700 p-6 shadow-sm ${className}`}>{children}</div>
  );
}

function Tabs({ active, onChange }) {
  return (
    <div className="-mb-px flex gap-1 overflow-x-auto rounded-xl border bg-white/70 dark:bg-gray-800/70 dark:border-gray-700 p-1">
      {TABS.map((t) => {
        const selected = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:bg-black/5 dark:hover:bg-gray-700 focus:outline-none ${
              selected ? "bg-black text-white dark:bg-gray-700" : "bg-transparent text-gray-700 dark:text-gray-300"
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
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const saved = window.localStorage.getItem("darkMode");
    if (saved !== null) {
      return saved === "true";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const activeIndex = useMemo(() => TABS.findIndex((t) => t.key === active), [active]);

  useEffect(() => {
    document.title = "Aaroh Bhardwaj | Full Stack Developer";
    
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = '/logo.png';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    // Apply dark mode class and save preference
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }

    window.localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

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
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur dark:bg-gray-800/70 dark:border-gray-700">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <img
            src="/name-logo.jpg"
            alt="Aaroh Bhardwaj Logo"
            className="h-12 w-12 shrink-0 rounded-2xl object-cover"
            />

            <div>
              <h1 className="text-xl font-bold leading-tight">{PROFILE.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{PROFILE.role}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{PROFILE.tagline}</p>
            </div>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-2">
            <button
              onClick={toggleDarkMode}
              className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="flex gap-2">
              {PROFILE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-black hover:text-white dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
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
              <p className="text-gray-600 dark:text-gray-400">A few things I've shipped recently.</p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {PROJECTS.map((p, idx) => (
                <SectionCard key={idx} className="flex flex-col gap-4">
                  <div className="h-36 w-full rounded-xl bg-linear-to-tr from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                    {p.image && (
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border dark:border-gray-600 px-3 py-1.5 text-sm font-semibold hover:bg-black hover:text-white dark:hover:bg-gray-700 transition-colors"
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
              <p className="text-gray-700 dark:text-gray-300">
                {PROFILE.blurb}
              </p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <SectionCard>
                <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                <div className="text-lg font-semibold">{PROFILE.location}</div>
              </SectionCard>
              <SectionCard>
                <div className="text-sm text-gray-600 dark:text-gray-400">Availability</div>
                <div className="text-lg font-semibold">{PROFILE.availability}</div>
              </SectionCard>
              <SectionCard>
                <div className="text-sm text-gray-600 dark:text-gray-400">Primary Stack</div>
                <div className="text-lg font-semibold">React • Node.js • MongoDB</div>
              </SectionCard>
            </div>

            <SectionCard>
              <h3 className="mb-3 text-xl font-bold">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <h3 className="mb-2 text-xl font-bold">Education</h3>
              <div className="space-y-1">
                <div className="font-semibold">{PROFILE.education.degree}</div>
                <div className="text-gray-700 dark:text-gray-300">{PROFILE.education.institution}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{PROFILE.education.year}</div>
              </div>
            </SectionCard>
          </section>
        )}

        {active === "experience" && (
          <section className="space-y-6">
            <SectionCard>
              <h2 className="mb-2 text-2xl font-bold">Experience</h2>
              <p className="text-gray-600 dark:text-gray-400">My professional journey.</p>
            </SectionCard>

            <div className="space-y-4">
              <SectionCard>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">SDE Intern — Phyniks Dreamlabs LLP</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Aug 2025 — Present</div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                  Contributing to Rackets & Returns Admin Panel, a full-stack SaaS dashboard for managing members, subscriptions, and analytics.
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  <li>Built backend APIs using Node.js, Express, and MongoDB with MVC structure and modular routing.</li>
                  <li>Developed responsive frontend with Next.js 14, React hooks, and Tailwind CSS (SSR for SEO).</li>
                </ul>
              </SectionCard>
            </div>
          </section>
        )}

        {active === "contact" && (
          <section className="space-y-6">
            <SectionCard>
              <h2 className="mb-2 text-2xl font-bold">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Let's discuss your next project or explore how we can collaborate. I'm eager to hear about your vision and will do my best to reply within 24 hours.
              </p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <SectionCard>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                    <a href={`mailto:${PROFILE.email}`} className="text-lg font-semibold underline">
                      {PROFILE.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Resume</div>
                    <a href="https://drive.google.com/file/d/19x6IBjABtLokotx-LLCrH5Uh5TjYh10B/view?usp=embed_facebook" target="_blank" className="text-lg font-semibold underline">
                      View CV
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Connect</div>
                    <div className="mt-1 flex gap-2">
                      {PROFILE.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold underline"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard>
                <form onSubmit={sendEmail} className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
                    <input name="name" required className="mt-1 w-full rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
                    <input name="from" type="email" required className="mt-1 w-full rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Message</label>
                    <textarea name="message" rows={4} required className="mt-1 w-full rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button type="submit" className="rounded-xl bg-black dark:bg-gray-700 px-4 py-2 font-semibold text-white hover:opacity-90 transition-opacity">
                    Send
                  </button>
                </form>
              </SectionCard>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
      </footer>
      </div>
    </div>
  );
}
