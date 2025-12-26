import React, { useMemo, useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Single-file, drop-in portfolio page ---
// How to use:
// 1) Put this file in your React app (e.g., src/Portfolio.jsx) and import <Portfolio /> in App.jsx.
// 2) Edit the 'PROFILE', 'TABS', and 'PROJECTS' data below with your info.
// 3) Tailwind CSS recommended for styling. (Works well with Tailwind v4.)

const PROFILE = {
  name: "Aaroh Bhardwaj",
  role: "Backend-Focused Full Stack Developer",
  tagline: "Building systems that behave correctly under real conditions.",
  blurb:
    "Backend-focused full stack engineer interested in distributed systems and infrastructure-aware application design. I work on microservices, event-driven workflows, distributed caching, and APIs that remain correct under load and failure. I learn by shipping real systems, exploring failure modes, and understanding trade-offs around consistency, retries, and scalability.",
  location: "Bengaluru, India",
  availability: "Open to Backend • Full Stack • Platform • SRE • Infra roles",
  email: "aarohb.1507@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1Rk2x46o-cuTd-mwN0rnS6vnBc9VNK9Za/view?usp=sharing",
  socials: [
    { label: "GitHub", href: "https://github.com/aarohb1507" },
    { label: "LinkedIn", href: "https://linkedin.com/in/aaroh-bhardwaj" },
  ],
  skillCategories: {
    "Languages": ["JavaScript", "TypeScript"],
    "Backend": ["Node.js", "Express", "NestJS"],
    "Frontend": ["React", "Next.js", "Redux", "Tailwind CSS"],
    "Databases & Caching": ["MongoDB", "Redis"],
    "Infrastructure & Tools": ["Docker", "AWS EC2", "RabbitMQ", "Git", "Postman"]
  },
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
    title: "NexusFeed",
    description:
      "A production-grade, event-driven microservices backend focused on async messaging, distributed caching, and rate-limited APIs.",
    stack: ["Node.js", "Express", "JavaScript", "MongoDB", "Redis", "RabbitMQ", "Docker", "AWS EC2", "Multer", "Argon2", "JWT"],
    image: "/nexusfeed.png",
    links: [
      { label: "GitHub", href: "https://github.com/aarohb1507/NexusFeed" },
    ],
  },
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
    "Frontend application with task dashboards, progress tracking, role-based access, and responsive UI using Tailwind CSS.",
  stack: ["React", "Redux", "Tailwind CSS"],
  image: "/ems.png",
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
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className={`rounded-2xl border border-navy-600/50 bg-navy-800/50 backdrop-blur-sm p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/20 hover:scale-[1.01] hover:border-blue-500/50 ${className}`}>
      {children}
    </div>
  );
}

function Tabs({ active, onChange }) {
  return (
    <div className="-mb-px flex gap-1 overflow-x-auto rounded-xl border bg-white/70 dark:bg-gray-800/70 dark:border-gray-700 p-1 backdrop-blur-md">
      {TABS.map((t) => {
        const selected = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-black/5 dark:hover:bg-gray-700 focus:outline-none hover:scale-105 ${
              selected ? "bg-black text-white dark:bg-gray-700 scale-105 shadow-lg" : "bg-transparent text-gray-700 dark:text-gray-300"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function ProjectCard({ project, index, observerRef, isVisible }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (cardRef.current && observerRef.current) {
      observerRef.current.observe(cardRef.current);
    }

    // GSAP animation
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [observerRef, index]);

  // Generate problem/solution/impact based on project
  const getProblem = (title) => {
    if (title === "NexusFeed") return "Complex async workflows across multiple services";
    if (title === "eLibrary REST API") return "Managing multi-tenant book library with role-based access";
    return "Full-cycle task management with real-time updates";
  };

  const getSolution = (title) => {
    if (title === "NexusFeed") return "Event-driven microservices with RabbitMQ + Redis caching";
    if (title === "eLibrary REST API") return "RESTful API with JWT auth + Cloudinary CDN integration";
    return "Redux state management with Express backend";
  };

  const getImpact = (title) => {
    if (title === "NexusFeed") return "5 independent services • <100ms response time";
    if (title === "eLibrary REST API") return "Role-based access • Analytics-ready • Cloudinary CDN";
    return "Task tracking • Progress dashboards • Multi-user coordination";
  };

  return (
    <div
      ref={cardRef}
      data-id={`project-${index}`}
      className={`transform transition-all duration-700 ${
        isVisible[`project-${index}`]
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionCard className="flex flex-col gap-4 h-full group cursor-pointer hover:border-blue-500 border-navy-600/30 glass-light hover-glow">
        <div className="h-48 w-full rounded-xl bg-linear-to-br from-navy-700 to-navy-600 overflow-hidden relative transition-all duration-500 border border-navy-600/30">
          {project.image && (
            <img 
              src={project.image} 
              alt={project.title} 
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className={`transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="text-white text-xs space-y-1">
                <div className="font-semibold">Architecture:</div>
                <div className="flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-blue-600/30 backdrop-blur-sm rounded text-xs border border-blue-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 flex-1">
          <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-400 font-medium">Problem: </span>
              <span className="text-gray-300">{getProblem(project.title)}</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium">Solution: </span>
              <span className="text-gray-300">{getSolution(project.title)}</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium">Impact: </span>
              <span className="text-blue-400 font-semibold">{getImpact(project.title)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((t, i) => (
              <span 
                key={t}
                className="inline-flex items-center rounded-full border border-navy-600 bg-navy-700/50 px-2 py-0.5 text-xs font-medium text-gray-300 transition-all duration-300 hover:scale-110 hover:border-blue-500 hover:bg-blue-600/20 hover:text-blue-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto flex gap-2 pt-2">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-lg border border-navy-600 bg-navy-700/50 px-3 py-2 text-sm font-semibold text-gray-100 hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              {l.label} →
            </a>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("projects");
  const [isVisible, setIsVisible] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedBeliefs, setExpandedBeliefs] = useState({});
  const [expandedExperience, setExpandedExperience] = useState({});
  const observerRef = useRef(null);

  const activeIndex = useMemo(() => TABS.findIndex((t) => t.key === active), [active]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
  }, []);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    document.title = "Aaroh Bhardwaj | Backend-Focused Full Stack Developer";
    
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = '/logo.png';
    document.head.appendChild(link);

    // Scroll progress handler
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    // GSAP Hero Animation
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 }
    );

    gsap.fromTo(
      ".hero-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1, stagger: 0.2 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="dark">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <div className="min-h-screen bg-linear-to-br from-navy-900 via-navy-800 to-navy-700 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 text-gray-100 dark:text-gray-100 transition-all duration-500 relative overflow-hidden" style={{ backgroundColor: '#0a1628' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-float-slow" />
        </div>
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 border-b border-navy-700/50 bg-navy-900/80 backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/name-logo.jpg"
              alt="Aaroh Bhardwaj"
              className="h-10 w-10 shrink-0 rounded-xl object-cover ring-2 ring-blue-500/30 transition-all duration-300 hover:ring-4 hover:ring-blue-400 hover:scale-110"
            />
            <span className="font-semibold text-lg text-gray-100">{PROFILE.name}</span>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-2">
            <div className="flex gap-2">
              {PROFILE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-navy-600 px-3 py-1.5 text-sm font-medium text-gray-100 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
        
        {/* Control Surface Navigation */}
        <div className="mx-auto max-w-7xl px-6 pb-4">
          <div className="-mb-px flex gap-1 overflow-x-auto rounded-xl border border-navy-600/50 bg-navy-800/50 backdrop-blur-md shadow-lg p-1">
            {TABS.map((t) => {
              const selected = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none ${
                    selected 
                      ? "bg-blue-600 text-white scale-105 shadow-xl shadow-blue-600/40" 
                      : "bg-transparent text-gray-300 hover:bg-navy-700 hover:text-white hover:translate-x-0.5"
                  }`}
                >
                  {t.label}
                  {selected && (
                    <div className="absolute inset-0 rounded-lg bg-blue-500/20 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Animated Progress Indicator */}
        <div className="mx-auto hidden h-0.5 max-w-7xl md:block overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-blue-600 transition-all duration-500 ease-out shadow-lg shadow-blue-500/50"
            style={{ transform: `translateX(${activeIndex * 100}%)`, width: '25%' }}
          />
        </div>
      </header>

      {/* Hero Section */}
      {active === "projects" && (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <div>
              <h2 className="hero-title text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-100">
                Backend-Focused Full Stack Developer<br />
                <span className="gradient-text">who ships production-grade systems.</span>
              </h2>
            </div>
            <div className="hero-subtitle text-lg md:text-xl text-gray-300 mb-8">
              Backend • Full Stack • Platform Engineering • SRE • Infrastructure
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl shadow-blue-600/30"
              >
                View Systems I've Built
              </button>
              <button 
                onClick={() => setActive('about')}
                className="hero-cta rounded-xl border-2 border-navy-600 hover:border-blue-500 px-6 py-3 font-semibold text-gray-100 hover:bg-navy-700 hover:scale-105 transition-all duration-300"
              >
                Read My Engineering Philosophy
              </button>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta rounded-xl border-2 border-blue-500 bg-blue-600/10 px-6 py-3 font-semibold text-blue-200 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl shadow-blue-600/30"
              >
                Download CV
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-7xl space-y-12 px-6 pb-12 relative z-10">{active === "projects" && (
          <section className="space-y-8" id="projects-grid">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-bold mb-3 text-gray-100">Production Systems</h3>
              <p className="text-gray-400">Real infrastructure that handles scale, failure, and complexity.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p, idx) => (
                <ProjectCard 
                  key={idx}
                  project={p}
                  index={idx}
                  observerRef={observerRef}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </section>
        )}

        {active === "about" && (
          <section className="space-y-8 pt-12 md:pt-16">
            <div className="max-w-3xl">
              <h3 className="text-4xl font-bold mb-4">Engineering Philosophy</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                What I believe about building production systems.
              </p>
            </div>

            {/* Expandable Belief Blocks */}
            <div className="space-y-4 max-w-4xl">
              {[
                {
                  id: 'systems',
                  belief: 'Backend engineering is about designing event-driven, decoupled systems',
                  principle: 'Event-first architecture enables independent scaling',
                  application: '• Built NexusFeed with 5 logically separated services (ingestion, processing, enrichment, delivery)\n• Enabled independent scaling and reduced coupling, improving iteration speed by 40%'
                },
                {
                  id: 'failure',
                  belief: 'Systems must be designed with failure-first engineering mindset',
                  principle: 'Assume things will break, design for recovery',
                  application: '• Modeled crash scenarios: DB write failures, duplicate requests, partial execution\n• Implemented idempotency guarantees achieving exactly-once behavior and zero data loss'
                },
                {
                  id: 'gateway',
                  belief: 'API Gateway layer is critical for controlled system access',
                  principle: 'Centralize authentication, validation, and routing logic',
                  application: '• Implemented API Gateway proxying requests between frontend and internal services\n• Centralized auth/validation, simplified client APIs, and improved security posture'
                },
                {
                  id: 'performance',
                  belief: 'Database state is the source of truth for distributed coordination',
                  principle: 'DB writes as authoritative checkpoints before downstream actions',
                  application: '• Designed DB writes as checkpoints before downstream actions in NexusFeed\n• Achieved zero data inconsistency with predictable recovery during simulated crashes'
                }
              ].map((item) => (
                <SectionCard 
                  key={item.id}
                  className="hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => setExpandedBeliefs(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-purple-500 rounded-full" />
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          I believe {item.belief}
                        </h4>
                      </div>
                      
                      {expandedBeliefs[item.id] && (
                        <div className="ml-7 space-y-3 mt-4 animate-fade-in">
                          <div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Principle:</span>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">{item.principle}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">How I apply it:</span>
                            <p className="text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">{item.application}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => setExpandedBeliefs(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-transform duration-300 cursor-pointer flex-shrink-0" 
                      style={{ transform: expandedBeliefs[item.id] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </SectionCard>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 animate-fade-in">
              <SectionCard className="hover:bg-linear-to-br hover:from-blue-50 hover:to-transparent dark:hover:from-blue-950/30 dark:hover:to-transparent">
                <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                <div className="text-lg font-semibold">{PROFILE.location}</div>
              </SectionCard>
              <SectionCard className="hover:bg-linear-to-br hover:from-purple-50 hover:to-transparent dark:hover:from-purple-950/30 dark:hover:to-transparent">
                <div className="text-sm text-gray-600 dark:text-gray-400">Availability</div>
                <div className="text-lg font-semibold">{PROFILE.availability}</div>
              </SectionCard>
              <SectionCard className="hover:bg-linear-to-br hover:from-pink-50 hover:to-transparent dark:hover:from-pink-950/30 dark:hover:to-transparent">
                <div className="text-sm text-gray-600 dark:text-gray-400">Primary Focus</div>
                <div className="text-lg font-semibold">Backend-Focused Full Stack • Platform • SRE • Infrastructure</div>
              </SectionCard>
            </div>

            <SectionCard>
              <h3 className="mb-4 text-xl font-bold">Technical Skills</h3>
              <div className="space-y-4">
                {Object.entries(PROFILE.skillCategories).map(([category, skills], catIdx) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span 
                          key={skill}
                          className="inline-flex items-center rounded-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 text-xs font-medium dark:text-gray-300 transition-all duration-300 hover:scale-110 hover:border-blue-400 hover:bg-blue-50 dark:hover:border-blue-600 dark:hover:bg-blue-950/30 hover:shadow-md"
                          style={{ animationDelay: `${(catIdx * 10 + i) * 30}ms` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
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
          <section className="space-y-8 pt-12 md:pt-16">
            <div className="max-w-3xl">
              <h3 className="text-4xl font-bold mb-4">Experience Timeline</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Building production systems, one commit at a time.
              </p>
            </div>

            <div className="space-y-6 relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-transparent hidden md:block" />

              <SectionCard className="hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-500 md:ml-8 relative">
                {/* Timeline Dot */}
                <div className="absolute -left-10 top-8 hidden md:block">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-heartbeat absolute inline-flex h-full w-full rounded-full bg-green-400"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white dark:border-gray-900"></span>
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-3">
                  <h3 className="text-xl font-bold">Software Development Engineer Intern</h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 md:hidden">
                      <span className="animate-heartbeat absolute inline-flex h-full w-full rounded-full bg-green-400"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Aug 2025 — Present • Remote</div>
                  </div>
                </div>
                
                <div className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Phyniks Dreamlabs LLP
                </div>

                <div className="mb-3 flex gap-3 text-xs">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                    500+ members
                  </span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full font-medium">
                    50+ stores
                  </span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-full font-medium">
                    2-dev team
                  </span>
                </div>

                <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300 list-none">
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Architected RESTful APIs using Node.js, Express, and MongoDB to power an admin panel serving <strong>500+ members</strong> with role-based access control and real-time data synchronization.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Built Aaina Super Admin Analytics Dashboard (Next.js 14, SSR) as part of a <strong>2-developer team</strong>, enabling multi-admin authentication and analytics across <strong>50+ Shopify stores</strong> with optimized filtering and sorting.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Designed API endpoints supporting real-time dashboard updates, reducing manual reporting effort and improving data visibility for cross-store analytics workflows.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Engineered modular backend architecture with MVC pattern and Express routing, ensuring maintainable codebase and scalable API design for concurrent multi-admin sessions.</span>
                  </li>
                </ul>

                <button
                  onClick={() => setExpandedExperience(prev => ({ ...prev, phyniks: !prev.phyniks }))}
                  className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2"
                >
                  {expandedExperience.phyniks ? 'Hide' : 'Show'} what I learned here
                  <svg className={`w-4 h-4 transition-transform duration-300 ${expandedExperience.phyniks ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedExperience.phyniks && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl animate-fade-in">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Key Learnings:</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
                      <li>Managing state consistency across 50+ independent Shopify stores taught me the importance of eventual consistency patterns</li>
                      <li>Building for 500+ concurrent users showed me where naive implementations break and why caching layers matter</li>
                      <li>Working in a 2-person team meant every design decision had to be self-documenting and maintainable</li>
                      <li>SSR with Next.js 14 revealed performance tradeoffs between client-side React and server-rendered content</li>
                    </ul>
                  </div>
                )}
              </SectionCard>
            </div>
          </section>
        )}

        {active === "contact" && (
          <section className="space-y-8 pt-12 md:pt-16">
            <div className="max-w-3xl">
              <h3 className="text-4xl font-bold mb-4">Let's Build Something Serious</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Interested in discussing backend architecture, distributed systems, or collaboration opportunities?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                ⚡ I usually reply within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-5xl">
              <SectionCard className="space-y-4">
                <h4 className="text-lg font-semibold mb-4">Quick Connect</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</div>
                    <a href={`mailto:${PROFILE.email}`} className="text-lg font-semibold underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      {PROFILE.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Connect</div>
                    <div className="flex gap-3">
                      {PROFILE.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border rounded-lg text-sm font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hover:scale-105"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard>
                <h4 className="text-lg font-semibold mb-4">Send a Message</h4>
                <form onSubmit={sendEmail} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input 
                      name="name" 
                      required 
                      placeholder="Your name"
                      className="w-full rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-md" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input 
                      name="from" 
                      type="email" 
                      required 
                      placeholder="your@email.com"
                      className="w-full rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-md" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea 
                      name="message" 
                      rows={5} 
                      required 
                      placeholder="Tell me about your project, technical challenge, or just say hi..."
                      className="w-full rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-md resize-none" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full rounded-xl bg-linear-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg shadow-blue-500/30 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message →</span>
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </form>
              </SectionCard>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-4 text-center text-sm text-gray-500 dark:text-gray-400 relative z-10">
        <div className="animate-fade-in">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
        </div>
      </footer>
      </div>
    </div>
  );
}
