import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import Stack from "./Stack";
import DomeGallery from "./DomeGallery";
import VideoPlayer from "./VideoPlayer";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);


const CLASS_NAMES = [
  "Name 01", "Name 02", "Name 03", "Name 04", "Name 05",
  "Name 06", "Name 07", "Name 08", "Name 09", "Name 10",
  "Name 11", "Name 12", "Name 13", "Name 14", "Name 15",
  "Name 16", "Name 17", "Name 18", "Name 19", "Name 20",
  "Name 21", "Name 22", "Name 23", "Name 24", "Name 25",
  "Name 26", "Name 27", "Name 28", "Name 29", "Name 30",
  "Name 31", "Name 32", "Name 33", "Name 34", "Name 35",
  "Name 36", "Name 37", "Name 38", "Name 39", "Name 40",
  "Name 41", "Name 42", "Name 43", "Name 44", "Name 45",
  "Name 46", "Name 47", "Name 48", "Name 49", "Name 50",
  "Name 51", "Name 52", "Name 53", "Name 54", "Name 55",
  "Name 56", "Name 57", "Name 58", "Name 59", "Name 60",
];

const ALL_PHOTOS = [
  "WhatsApp Image 2026-07-08 at 1.44.07 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.15 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.19 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.21 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.23 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.25 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.26 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.28 PM (1).jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.28 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.30 PM (1).jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.30 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.35 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.38 PM (1).jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.38 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.40 PM (1).jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.40 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.46 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.45.00 PM.jpeg",
];


const HERO_PHOTOS = ALL_PHOTOS.slice(0, 6);


const QUOTES = [
  {
    text: "These three years weren't just about books and exams — they were about finding who we truly are.",
    author: "Class Representative",
    emoji: "🌟",
  },
  {
    text: "We came as strangers, we leave as family. Every chai break, every last-minute submission — I'd do it all again.",
    author: "A Batchmate",
    emoji: "☕",
  },
  {
    text: "The best teachers taught us more than their subject — they taught us to believe in ourselves.",
    author: "Grateful Student",
    emoji: "🎓",
  },
];

const TIMELINE = [
  {
    year: "Year 1",
    title: "The Beginning",
    desc: "New faces, new halls, and the exciting chaos of orientation week. Friendships that would last a lifetime quietly began.",
    icon: "🌱",
    color: "#10b981",
  },
  {
    year: "Year 2",
    title: "Finding Our Groove",
    desc: "Group projects, late-night study sessions, and the first glimpse of what we could really become together.",
    icon: "🔥",
    color: "#f59e0b",
  },
  {
    year: "Year 3",
    title: "The Grand Finale",
    desc: "Farewells, results, dreams on the horizon. We leave changed — not just educated, but truly transformed.",
    icon: "🎓",
    color: "#06b6d4",
  },
];


const STATS = [
  { value: 3, suffix: "+", label: "Years Together" },
  { value: 60, suffix: "", label: "Brilliant Minds" },
  { value: 100, suffix: "%", label: "Pure Memories" },
  { value: 1, suffix: "", label: "Unforgettable Batch" },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => setCount(Math.floor(obj.val)),
        });
      },
    });
    return () => trigger.kill();
  }, [target]);

  return (
    <span ref={ref} className="stat-number">
      {count}
      {suffix}
    </span>
  );
}


function StatsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".stat-card");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: "expo.out", stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div className="stat-card" key={i}>
            <Counter target={s.value} suffix={s.suffix} />
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


function NameTicker() {
  const doubled = [...CLASS_NAMES, ...CLASS_NAMES];
  return (
    <section className="names-section">
      <p className="names-section-label">✦ Our Batch of 2026 ✦</p>
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {doubled.map((name, i) => (
            <span className="name-chip" key={i}>
              <span className="chip-num">
                {String((i % CLASS_NAMES.length) + 1).padStart(2, "0")}
              </span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


function HeroStack() {
  const stackCards = ALL_PHOTOS.slice(0, 6).map((file, i) => (
    <img
      key={i}
      src={`/${file}`}
      alt={`memory-${i + 1}`}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem', pointerEvents: 'none' }}
    />
  ));

  return (
    <div className="hero-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
      <div style={{ width: 340, height: 340 }}>
        <Stack
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={true}
          autoplay={true}
          autoplayDelay={2800}
          pauseOnHover={true}
          cards={stackCards}
          animationConfig={{ stiffness: 220, damping: 22 }}
        />
      </div>
    </div>
  );
}


function HeroLeft() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(el.querySelector(".hero-badge"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 })
      .fromTo(el.querySelector(".hero-title"), { opacity: 0, y: 50, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1.1 }, "-=0.5")
      .fromTo(el.querySelector(".hero-subtitle"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
      .fromTo(el.querySelector(".hero-cta"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.7 }, "-=0.4");
  }, []);

  return (
    <div className="hero-left" ref={ref}>
      <div className="hero-badge">
        <span className="badge-dot" />
        B.Com Computer Applications · Class of 2026
      </div>
      <h1 className="hero-title">
        Where Dreams<br />Find Direction.
      </h1>
      <p className="hero-subtitle">
        Every student who walks through these doors carries a dream.
        Here, we don't just teach subjects — we build character,
        confidence, and courage. Together, we turned doubts into
        determination, and mistakes into milestones.
      </p>
      <button
        className="hero-cta"
        onClick={() => document.querySelector(".names-section")?.scrollIntoView({ behavior: "smooth" })}
      >
        Meet the Batch ↓
      </button>
    </div>
  );
}

const GROUP_PHOTOS = [
  "WhatsApp Image 2026-07-08 at 1.44.07 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.15 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.19 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.26 PM.jpeg",
  "WhatsApp Image 2026-07-08 at 1.44.38 PM.jpeg"
];

const STACK_CAPTIONS = [
  "Our perfect class portrait — smiles and dreams 💖",
  "Traditional day vibes — look at us shine! ✨",
  "The gang's all here — college garden memories 🌳",
  "Dressed to impress — the boys and girls together 👔👗",
  "The last day huddle — a family forever 🎓",
];

function MemoryGallery() {
  const imageUrls = ALL_PHOTOS.map(file => `/${file}`);

  return (
    <section className="gallery-section">
      <div className="section-header">
        <p className="section-eyebrow">✦ Memories</p>
        <h2 className="section-title">Captured Moments</h2>
        <p className="section-sub">Every picture tells the story of a friendship, a laugh, a milestone.</p>
      </div>

      <div style={{ width: '100vw', height: '100vh', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginTop: '40px', marginBottom: '40px' }}>
        <DomeGallery
          images={imageUrls}
          grayscale={false}
          openedImageWidth="640px"
          openedImageHeight="360px"
        />
      </div>
    </section>
  );
}


function JourneySlider() {
  const [activeTab, setActiveTab] = useState(0);

  const data = [
    {
      year: "Year 1",
      title: "The Beginning",
      desc: "New faces, new halls, and the exciting chaos of orientation week. Friendships that would last a lifetime quietly began.",
      icon: "🌱",
      color: "#10b981",
    },
    {
      year: "Year 2",
      title: "Finding Our Groove",
      desc: "Group projects, late-night study sessions, and the first glimpse of what we could really become together.",
      icon: "🔥",
      color: "#f59e0b",
    },
    {
      year: "Year 3",
      title: "The Grand Finale",
      desc: "Farewells, results, dreams on the horizon. We leave changed — not just educated, but truly transformed.",
      icon: "🎓",
      color: "#06b6d4",
    },
  ];

  return (
    <section className="timeline-section">
      <div className="section-header">
        <p className="section-eyebrow">✦ The Journey</p>
        <h2 className="section-title">Three Years, One Story</h2>
      </div>

      <div className="slider-wrapper">

        <div className="slider-tabs">
          {data.map((item, idx) => (
            <button
              key={idx}
              className={`slider-tab ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
              style={{
                "--accent": item.color,
                borderColor: activeTab === idx ? item.color : "rgba(255,255,255,0.1)",
              }}
            >
              <span className="slider-tab-num">0{idx + 1}</span>
              <span className="slider-tab-name">{item.year}</span>
            </button>
          ))}
        </div>


        <div className="slider-content-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="slider-card"
              style={{ borderColor: `${data[activeTab].color}30` }}
            >
              <div className="slider-card-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${data[activeTab].color}12, transparent 60%)` }} />
              <div className="slider-card-left">
                <span className="slider-icon" style={{ background: `${data[activeTab].color}15`, boxShadow: `0 0 20px ${data[activeTab].color}25` }}>
                  {data[activeTab].icon}
                </span>
                <span className="slider-year" style={{ color: data[activeTab].color }}>{data[activeTab].year}</span>
              </div>
              <div className="slider-card-right">
                <h3 className="slider-title">{data[activeTab].title}</h3>
                <p className="slider-desc">{data[activeTab].desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function MemoryMarquee() {
  const row1 = [
    "Chai breaks at tea shop ☕",
    "Last-minute exam preparation 📝",
    "Backbenchers rule the world 👑",
    "Lab records submission panic 💻",
    "Class bunking coordination 🤫",
    "Unforgettable group pictures 📸",
  ];

  const row2 = [
    "Infinite inside jokes 💫",
    "Canteen chats and gossips 🍔",
    "Cultural fest dance reels 🎵",
    "Birthday birthday bumps 🎂",
    "Group studies that was just talking 📚",
    "Unbreakable bonds for life ❤️",
  ];

  return (
    <section className="marquee-section">
      <div className="section-header">
        <p className="section-eyebrow">✦ Flashbacks</p>
        <h2 className="section-title">The Class Vibe</h2>
      </div>

      <div className="marquee-container">

        <div className="marquee-track left-track">
          {[...row1, ...row1].map((text, i) => (
            <span key={i} className="marquee-chip">
              {text}
            </span>
          ))}
        </div>


        <div className="marquee-track right-track">
          {[...row2, ...row2].map((text, i) => (
            <span key={i} className="marquee-chip accent-chip">
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


function FarewellBanner() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".farewell-line"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1, ease: "expo.out", stagger: 0.2,
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section className="farewell-section" ref={ref}>
      <div className="farewell-orb farewell-orb-1" />
      <div className="farewell-orb farewell-orb-2" />
      <div className="farewell-inner">
        <p className="farewell-line section-eyebrow" style={{ marginBottom: "16px" }}>✦ Signing Off ✦</p>
        <h2 className="farewell-line farewell-title">
          We came as strangers, <br />
          we leave as friends for life. <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" alt="waving hand" className="waving-hand-gif" />
        </h2>
        <p className="farewell-line farewell-body" style={{ fontStyle: "italic", fontSize: "1.2rem", color: "#a7f3d0" }}>
          "To the years that went by in a blink, and the bonds that will never fade.<br />
          May our paths cross again, but until then, here's to our beautiful beginning."
        </p>
        <div className="farewell-line farewell-tags">
          {["#BComCA2026", "#ClassOf2026", "#ForeverBatch", "#AlumniForever"].map((tag, i) => (
            <span className="farewell-tag" key={i}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}


function VideoSection() {
  return (
    <VideoPlayer />
  );
}



export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-content">
          <HeroLeft />
          <HeroStack />
        </div>
      </section>


      <StatsSection />
      {/* ── NAMES TICKER ── */}
      <NameTicker />


      <MemoryGallery />


      <JourneySlider />


      <VideoSection />


      <MemoryMarquee />


      <FarewellBanner />


      <footer className="footer-band">
        Made with ❤️ by <a href="https://lekhankt-port-folio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}><span>Lekhan</span></a>
      </footer>
    </main>
  );
}