import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronDown, Users, Briefcase, RotateCcw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface StaffMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  history: string;
  bio?: string;
}
interface Department {
  id: string;
  name: string;
  color: string;
  icon: string;
  lead: StaffMember;
  team: StaffMember[];
}

function staffPhoto(id: string): string {
  return `/staff/${id}.jpg`;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STAKEHOLDERS: StaffMember[] = [
  {
    id: "sh-1",
    name: "Strategic Partner A",
    role: "Board Member",
    photo: staffPhoto("sh-1"),
    history:
      "Former executive at a pan-African telecommunications firm with 20 years of experience in cross-border scaling and digital infrastructure investment. He has guided expansion strategies across 12 nations and now sits on YouTobia's advisory board.",
    bio: "Lead advisor for international expansion.",
  },
  {
    id: "sh-2",
    name: "Strategic Partner B",
    role: "Lead Investor",
    photo: staffPhoto("sh-2"),
    history:
      "Seasoned venture capitalist who has backed over 30 African tech startups. Brings deep financial expertise and a network spanning 15 countries. His portfolio companies collectively employ over 8,000 people across the continent.",
    bio: "Primary capital partner driving growth rounds.",
  },
  {
    id: "sh-3",
    name: "Strategic Partner C",
    role: "Advisory Board",
    photo: staffPhoto("sh-3"),
    history:
      "Former ambassador and policy expert with decades of public sector experience. Provides regulatory and governance oversight to align YouTobia with national digital strategy.",
    bio: "Policy and compliance advisor.",
  },
];

const CEO: StaffMember = {
  id: "ceo",
  name: "Tamiru Kassahun",
  role: "Founder & Chief Executive Officer",
  photo: staffPhoto("ceo"),
  history:
    "Tamiru began his career in 2010 as a freelance media producer in Addis Ababa. Over the next decade he founded three successful tech startups before establishing YouTobia in 2022 to unify Ethiopia's creative, educational, and entertainment industries under one digital conglomerate.",
  bio: "Visionary entrepreneur and multimedia architect.",
};

const DEPARTMENTS: Department[] = [
  {
    id: "technology",
    name: "Technology",
    color: "#0ea5e9",
    icon: "⚙",
    lead: {
      id: "tech-lead",
      name: "Dawit Alemu",
      role: "Chief Technology Officer",
      photo: staffPhoto("tech-lead"),
      history:
        "Previously head of engineering at a major Ethiopian financial institution. He joined YouTobia to architect the proprietary streaming engine and cloud infrastructure from the ground up.",
    },
    team: [
      { id: "tech-1", name: "Mekdes Girma", role: "Senior Full-Stack Engineer", photo: staffPhoto("tech-1"), history: "A full-stack specialist with 6 years of experience in Python and React. Mekdes previously developed national census software and now architects YouTobia's core data pipelines." },
      { id: "tech-2", name: "Berhane Wolde", role: "UX / UI Designer", photo: staffPhoto("tech-2"), history: "An award-winning designer focused on accessibility and inclusive design. She has shipped over 50 mobile apps for the East African market and leads the YouTobia design system." },
      { id: "tech-3", name: "Robel Tesfaw", role: "DevOps Engineer", photo: staffPhoto("tech-3"), history: "Infrastructure and CI/CD specialist who manages YouTobia's multi-region cloud deployment." },
    ],
  },
  {
    id: "admin",
    name: "Admin",
    color: "#f59e0b",
    icon: "🏛",
    lead: { id: "admin-lead", name: "Natnael Bekele", role: "Head of Administration", photo: staffPhoto("admin-lead"), history: "Natnael has a background in public administration and policy. He ensures the company's internal engines run as smoothly as its external-facing products." },
    team: [
      { id: "admin-1", name: "Sara Tadesse", role: "HR Manager", photo: staffPhoto("admin-1"), history: "Sara handles talent acquisition and employee wellbeing. Previously worked in the NGO sector for 8 years." },
      { id: "admin-2", name: "Amanuel Tefera", role: "Legal & Compliance Officer", photo: staffPhoto("admin-2"), history: "Corporate lawyer specializing in media licensing and intellectual property." },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    color: "#ec4899",
    icon: "📣",
    lead: { id: "mkt-lead", name: "Helina Tesfaye", role: "Marketing Director", photo: staffPhoto("mkt-lead"), history: "Helina led national campaigns for Ethiopia's largest beverage and telecom brands before moving into digital media. She is the architect of YouTobia's bold brand identity." },
    team: [
      { id: "mkt-1", name: "Kalkidan Haile", role: "Social Media Manager", photo: staffPhoto("mkt-1"), history: "Built online communities of over 500K followers across multiple African brands." },
      { id: "mkt-2", name: "Yohannes Desta", role: "Growth & Analytics Lead", photo: staffPhoto("mkt-2"), history: "Data-driven marketer using cohort analysis and attribution modeling to optimize acquisition." },
      { id: "mkt-3", name: "Tigist Kebede", role: "Brand Designer", photo: staffPhoto("mkt-3"), history: "Visual storyteller responsible for all marketing collaterals and brand consistency." },
    ],
  },
  {
    id: "content",
    name: "Content",
    color: "#10b981",
    icon: "🎬",
    lead: { id: "cnt-lead", name: "Yonas Bekele", role: "Head of Content", photo: staffPhoto("cnt-lead"), history: "A former documentary filmmaker whose work has been featured at international film festivals. Yonas brings cinematic storytelling to every production." },
    team: [
      { id: "cnt-1", name: "Abel Tadesse", role: "Lead Video Editor", photo: staffPhoto("cnt-1"), history: "With 12 years in the edit suite, Abel is the final creative touch on all eTop productions." },
      { id: "cnt-2", name: "Bethelehem Wondwosen", role: "Scriptwriter & Producer", photo: staffPhoto("cnt-2"), history: "Award-winning writer crafting scripts for series, short films, and branded docuseries." },
    ],
  },
  {
    id: "quiz",
    name: "Quiz",
    color: "#FF1E27",
    icon: "🧠",
    lead: { id: "quiz-lead", name: "Biruk Assefa", role: "Gamification Lead", photo: staffPhoto("quiz-lead"), history: "Biruk spent 5 years studying game mechanics in Europe before returning to build the EnqoqCash platform, blending cultural knowledge with modern gamification." },
    team: [
      { id: "quiz-1", name: "Abreham Girma", role: "Game Systems Engineer", photo: staffPhoto("quiz-1"), history: "Maintains real-time scoring, anti-cheat systems, and prize ledger infrastructure for EnqoqCash." },
      { id: "quiz-2", name: "Bezawit Desta", role: "Community Manager", photo: staffPhoto("quiz-2"), history: "Manages the EnqoqCash player league, overseeing events, leaderboards, and player relations." },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    color: "#8b5cf6",
    icon: "🔧",
    lead: { id: "ops-lead", name: "Feven Hailu", role: "Operations Lead", photo: staffPhoto("ops-lead"), history: "Feven manages the day-to-day coordination between creative and technical teams, ensuring cross-departmental projects run on time." },
    team: [
      { id: "ops-1", name: "Lidiya Solomon", role: "Project Manager", photo: staffPhoto("ops-1"), history: "Lidiya ensures all departmental timelines are met with precision. She introduced agile sprint workflows across the organization." },
      { id: "ops-2", name: "Mihret Girma", role: "Procurement & Vendor Manager", photo: staffPhoto("ops-2"), history: "Oversees all vendor relationships, equipment procurement, and facility logistics." },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();
}

// ─── Glass styles factory ─────────────────────────────────────────────────────
function glass(accent = "255,255,255", opacity = 0.06, blur = 16) {
  return {
    background: `rgba(${accent}, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties;
}

// ─── Animated word reveal ─────────────────────────────────────────────────────
const WordReveal: React.FC<{
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, className, style }) => {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <motion.span
            display="inline-block"
            initial={{ y: "110%", opacity: 0, rotateX: 40 }}
            whileInView={{ y: "0%", opacity: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: "inline-block", transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar: React.FC<{
  name: string;
  photo: string;
  size?: number;
  color?: string;
  ring?: boolean;
  square?: boolean;
}> = ({ name, photo, size = 56, color = "#FF1E27", ring = false, square = false }) => {
  const [err, setErr] = useState(false);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: square ? 14 : "50%",
        border: `2px solid ${color}`,
        boxShadow: ring
          ? `0 0 0 4px ${color}22, 0 0 28px ${color}55`
          : `0 0 0 1px ${color}22`,
        overflow: "hidden",
        flexShrink: 0,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {photo && !err ? (
        <img src={photo} alt={name} onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span style={{ fontWeight: 800, fontSize: size * 0.28, color, letterSpacing: "-0.02em", userSelect: "none" }}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

// ─── Flip Card ────────────────────────────────────────────────────────────────
const FlipCard: React.FC<{
  member: StaffMember;
  accentColor: string;
  width: number;
  height: number;
  photoSize: number;
  index?: number;
}> = ({ member, accentColor, width, height, photoSize, index = 0 }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      style={{ width, height, perspective: 1400, cursor: "pointer", flexShrink: 0 }}
      onClick={() => setFlipped((f) => !f)}
      whileHover={{ y: -6 }}
      title={flipped ? "Click to see photo" : "Click to read their story"}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          borderRadius: 24, overflow: "hidden",
          ...glass("255,255,255", 0.07, 20),
          boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.12)`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
        }}>
          {/* Accent bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          {/* Glow blob */}
          <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`, pointerEvents: "none" }} />
          {/* Photo */}
          <div style={{ position: "absolute", inset: 0, bottom: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 16px 0" }}>
            <Avatar name={member.name} photo={member.photo} size={photoSize} color={accentColor} ring square />
          </div>
          {/* Name strip — glass on glass */}
          <div style={{
            width: "100%", padding: "14px 18px 18px", textAlign: "center", flexShrink: 0,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          }}>
            <p style={{ fontWeight: 800, color: "#fff", fontSize: 15, lineHeight: 1.2, marginBottom: 5, letterSpacing: "-0.01em" }}>{member.name}</p>
            <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.22em", color: accentColor, textTransform: "uppercase" }}>{member.role}</p>
          </div>
          {/* Flip hint */}
          <div style={{
            position: "absolute", top: 12, right: 12,
            display: "flex", alignItems: "center", gap: 4,
            ...glass("0,0,0", 0.5, 10),
            border: `1px solid ${accentColor}30`, borderRadius: 20, padding: "4px 9px",
          }}>
            <RotateCcw size={9} color={accentColor} />
            <span style={{ fontFamily: "monospace", fontSize: 8, color: `${accentColor}cc`, letterSpacing: "0.08em" }}>flip</span>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)", borderRadius: 24, overflow: "hidden",
          background: `linear-gradient(160deg, ${accentColor}18 0%, rgba(10,10,10,0.85) 60%)`,
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${accentColor}45`,
          boxShadow: `0 24px 64px rgba(0,0,0,0.65), 0 0 40px ${accentColor}18`,
          display: "flex", flexDirection: "column", padding: "26px 22px", gap: 16,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
            <Avatar name={member.name} photo={member.photo} size={52} color={accentColor} ring />
            <div>
              <p style={{ fontWeight: 800, color: "#fff", fontSize: 14, lineHeight: 1.2, marginBottom: 4 }}>{member.name}</p>
              <p style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.2em", color: accentColor, textTransform: "uppercase" }}>{member.role}</p>
            </div>
          </div>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${accentColor}45, transparent)` }} />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 1.82, fontWeight: 300 }}>{member.history}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <RotateCcw size={9} color={`${accentColor}70`} />
            <span style={{ fontFamily: "monospace", fontSize: 8, color: `${accentColor}55`, letterSpacing: "0.12em" }}>click to flip back</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Department Card ──────────────────────────────────────────────────────────
const DepartmentCard: React.FC<{ dept: Department; index: number; isActive: boolean; onClick: () => void }> = ({
  dept, index, isActive, onClick,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 44 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6 }}
  >
    <button
      onClick={onClick}
      style={{
        width: "clamp(155px, 15vw, 190px)",
        ...glass("255,255,255", isActive ? 0.12 : 0.055, 20),
        background: isActive
          ? `linear-gradient(160deg, ${dept.color}28 0%, rgba(255,255,255,0.06) 100%)`
          : "rgba(255,255,255,0.055)",
        border: `1px solid ${isActive ? dept.color + "80" : "rgba(255,255,255,0.1)"}`,
        borderRadius: 22,
        padding: "24px 18px",
        cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        boxShadow: isActive
          ? `0 28px 56px ${dept.color}22, 0 0 0 1px ${dept.color}45, inset 0 1px 0 rgba(255,255,255,0.15)`
          : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${dept.color}, transparent)`, opacity: isActive ? 1 : 0.4, transition: "opacity 0.3s" }} />
      {/* Dept icon */}
      <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${dept.color}18`, border: `1px solid ${dept.color}38`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
        {dept.icon}
      </div>
      <Avatar name={dept.lead.name} photo={dept.lead.photo} size={88} color={dept.color} ring={isActive} />
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.24em", color: dept.color, textTransform: "uppercase", fontWeight: 700, marginBottom: 5 }}>{dept.name}</p>
        <p style={{ fontWeight: 700, color: "#fff", fontSize: 13, lineHeight: 1.3, marginBottom: 3 }}>{dept.lead.name}</p>
        <p style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.1em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase" }}>{dept.lead.role}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, color: isActive ? dept.color : "rgba(255,255,255,0.28)", transition: "color 0.3s" }}>
        <Users size={10} />
        <span style={{ fontSize: 9, fontFamily: "monospace" }}>{dept.team.length} members</span>
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={10} />
        </motion.div>
      </div>
    </button>
  </motion.div>
);

// ─── Member Card (inside panel) ───────────────────────────────────────────────
const MemberCard: React.FC<{ member: StaffMember; color: string; index: number; isLead?: boolean }> = ({
  member, color, index, isLead = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.95 }}
    transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    style={{
      ...glass("255,255,255", isLead ? 0.1 : 0.05, 16),
      background: isLead
        ? `linear-gradient(135deg, ${color}18 0%, rgba(255,255,255,0.06) 100%)`
        : "rgba(255,255,255,0.05)",
      border: `1px solid ${isLead ? color + "55" : "rgba(255,255,255,0.09)"}`,
      borderRadius: 18,
      padding: "22px 20px",
      display: "flex", gap: 18, alignItems: "flex-start",
      position: "relative", overflow: "hidden",
      boxShadow: isLead ? `0 16px 40px ${color}15, inset 0 1px 0 rgba(255,255,255,0.12)` : "inset 0 1px 0 rgba(255,255,255,0.06)",
    }}
  >
    <div style={{ position: "absolute", top: 0, left: 0, width: 3, bottom: 0, background: isLead ? `linear-gradient(to bottom, ${color}, ${color}30)` : `linear-gradient(to bottom, ${color}50, transparent)`, borderRadius: "18px 0 0 18px" }} />
    <div style={{ paddingLeft: 6 }}>
      <Avatar name={member.name} photo={member.photo} size={88} color={color} ring={isLead} square />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      {isLead && (
        <div style={{ display: "inline-block", background: `${color}20`, border: `1px solid ${color}35`, borderRadius: 4, padding: "2px 9px", marginBottom: 8 }}>
          <span style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.22em", color, textTransform: "uppercase", fontWeight: 700 }}>Department Lead</span>
        </div>
      )}
      <p style={{ fontWeight: 800, color: "#fff", fontSize: 15, lineHeight: 1.2, marginBottom: 4 }}>{member.name}</p>
      <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.16em", color, textTransform: "uppercase", marginBottom: 12 }}>{member.role}</p>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.58)", lineHeight: 1.78, fontWeight: 300 }}>{member.history}</p>
    </div>
  </motion.div>
);

// ─── Department Panel ─────────────────────────────────────────────────────────
const DepartmentPanel: React.FC<{ dept: Department | null; onClose: () => void }> = ({ dept, onClose }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {dept && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 100 }}
          />
          <motion.div
            key="panel"
            initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220, mass: 0.8 }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0, maxHeight: "84vh",
              ...glass("255,255,255", 0.08, 28),
              background: "rgba(8,8,8,0.85)",
              borderTop: `2px solid ${dept.color}`,
              borderRadius: "28px 28px 0 0", zIndex: 101,
              overflow: "hidden", display: "flex", flexDirection: "column",
              boxShadow: `0 -32px 80px rgba(0,0,0,0.9), 0 -2px 0 ${dept.color}, inset 0 1px 0 rgba(255,255,255,0.08)`,
            }}
          >
            {/* Header */}
            <div style={{
              padding: "22px 32px 18px", borderBottom: `1px solid rgba(255,255,255,0.08)`,
              display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
              background: `linear-gradient(135deg, ${dept.color}0e 0%, transparent 100%)`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: `${dept.color}18`, border: `1px solid ${dept.color}45`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{dept.icon}</div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.28em", color: dept.color, textTransform: "uppercase", fontWeight: 700, marginBottom: 3 }}>Department</p>
                  <h3 style={{ fontWeight: 900, color: "#fff", fontSize: 24, letterSpacing: "-0.025em" }}>{dept.name}</h3>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ ...glass("255,255,255", 0.07, 10), border: `1px solid ${dept.color}32`, borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Briefcase size={12} color={dept.color} />
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: dept.color, fontWeight: 700 }}>{dept.team.length + 1} members</span>
                </div>
                <button
                  onClick={onClose}
                  style={{ width: 38, height: 38, borderRadius: "50%", ...glass("255,255,255", 0.07, 10), border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,30,39,0.2)"; b.style.borderColor = "rgba(255,30,39,0.4)"; b.style.color = "#FF1E27"; }}
                  onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.07)"; b.style.borderColor = "rgba(255,255,255,0.12)"; b.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            {/* Grid */}
            <div style={{ padding: "24px 32px 40px", overflowY: "auto", flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16, alignContent: "start" }}>
              <MemberCard member={dept.lead} color={dept.color} index={0} isLead />
              {dept.team.map((m, i) => <MemberCard key={m.id} member={m} color={dept.color} index={i + 1} />)}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Connector ────────────────────────────────────────────────────────────────
const Connector: React.FC<{ color?: string; height?: number }> = ({ color = "#FF1E27", height = 52 }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height, position: "relative" }}>
    <div style={{ width: 1, height: "100%", background: `linear-gradient(to bottom, ${color}90, ${color}15)` }} />
    <div style={{ position: "absolute", bottom: 0, width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}` }} />
  </div>
);

// ─── Tier label — glass pill ──────────────────────────────────────────────────
const TierLabel: React.FC<{ label: string; sub?: string; color?: string }> = ({ label, sub, color = "rgba(255,255,255,0.55)" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    style={{ textAlign: "center", marginBottom: 28 }}
  >
    <div style={{
      display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4,
      ...glass("255,255,255", 0.06, 14),
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 100, padding: "8px 20px",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
    }}>
      <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.32em", color, textTransform: "uppercase", fontWeight: 700 }}>{label}</span>
      {sub && <span style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{sub}</span>}
    </div>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const StaffHierarchy: React.FC = () => {
  const [activeDept, setActiveDept] = useState<Department | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleDept = (dept: Department) =>
    setActiveDept((p) => (p?.id === dept.id ? null : dept));

  useEffect(() => {
    document.body.style.overflow = activeDept ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeDept]);

  // Video parallax scroll
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const ctx = gsap.context(() => {
      gsap.to(video, {
        yPercent: 15, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top bottom", end: "bottom top", scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="staff"
        style={{
          background: "transparent",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* ── Background video + layers ──────────────────────────────── */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <video
            ref={videoRef}
            src="/c.mp4"
            autoPlay muted loop playsInline
            style={{
              position: "absolute", inset: 0, width: "100%", height: "115%",
              objectFit: "cover", opacity: 0.18,
              filter: "saturate(0.3) brightness(0.5)",
            }}
          />
          {/* Dark base so glass cards are always readable */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(4,4,4,0.72)" }} />
          {/* Radial vignette */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 0%, rgba(4,4,4,0.9) 80%)" }} />
          {/* Fine grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          {/* Floating red orb — top right */}
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,30,39,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
          {/* Floating gold orb — bottom left */}
          <div style={{ position: "absolute", bottom: "-8%", left: "-4%", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        </div>

        {/* ── Creative Header ─────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(60px, 10vw, 100px)", position: "relative" }}>

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28,
              ...glass("255,30,39", 0.08, 14),
              border: "1px solid rgba(255,30,39,0.25)",
              borderRadius: 100, padding: "8px 20px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(255,30,39,0.1)",
            }}
          >
            <Users size={11} color="#FF1E27" />
            <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.35em", color: "#FF1E27", fontWeight: 700, textTransform: "uppercase" }}>
              Organizational Structure
            </span>
          </motion.div>

          {/* Headline — word-by-word reveal with mixed sizes */}
          <div style={{ marginBottom: 12, lineHeight: 1, position: "relative" }}>
            {/* Line 1 — thin italic "The" + big "People" */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.3em", flexWrap: "wrap", marginBottom: 8 }}>
              <span style={{ display: "inline-block", overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "inline-block",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(1.6rem, 4vw, 3.4rem)",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.04em",
                  }}
                >
                  The
                </motion.span>
              </span>
              <span style={{ display: "inline-block", overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "inline-block",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                    color: "#fff",
                    letterSpacing: "-0.04em",
                  }}
                >
                  People
                </motion.span>
              </span>
            </div>

            {/* Line 2 — "Behind" outlined + "YouTobia." solid red */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
              <span style={{ display: "inline-block", overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "inline-block",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                    letterSpacing: "-0.04em",
                    /* outlined text */
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                  }}
                >
                  Behind
                </motion.span>
              </span>
              <span style={{ display: "inline-block", overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "inline-block",
                    fontWeight: 900,
                    fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                    letterSpacing: "-0.04em",
                    background: "linear-gradient(135deg, #FF1E27 0%, #ff6b6b 50%, #FF1E27 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  YouTobia.
                </motion.span>
              </span>
            </div>

            {/* Decorative horizontal rule with glow */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 20,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,30,39,0.5), rgba(255,215,0,0.3), rgba(255,30,39,0.5), transparent)",
                boxShadow: "0 0 16px rgba(255,30,39,0.3)",
                transformOrigin: "center",
              }}
            />
          </div>

          {/* Tagline — character stagger */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(12px, 1.4vw, 15px)",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.9,
              fontWeight: 300,
              maxWidth: 520,
              margin: "20px auto 0",
              letterSpacing: "0.02em",
            }}
          >
            From founding stakeholders to every team member —{" "}
            <span style={{
              color: "rgba(255,255,255,0.7)",
              fontStyle: "italic",
            }}>
              flip a card
            </span>{" "}
            to read their story.{" "}
            <span style={{
              ...glass("255,255,255", 0.08, 8),
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 4,
              padding: "2px 8px",
              display: "inline",
              fontSize: "0.9em",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.03em",
            }}>
              Click a department to meet the team.
            </span>
          </motion.p>
        </div>

        {/* ── TIER 0: Stakeholders ─────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TierLabel label="Stakeholders" sub="Founding Partners & Board Members" color="rgba(255,215,0,0.75)" />
          <div style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}>
            {STAKEHOLDERS.map((s, i) => (
              <FlipCard key={s.id} member={s} accentColor="#FFD700" width={230} height={340} photoSize={170} index={i} />
            ))}
          </div>
          <Connector color="#FFD700" height={56} />
          <div style={{ width: "min(560px, 82%)", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)" }} />
        </div>

        {/* ── TIER 1: CEO ───────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Connector color="#FF1E27" height={56} />
          <TierLabel label="Chief Executive Officer" color="rgba(255,30,39,0.8)" />
          <FlipCard member={CEO} accentColor="#FF1E27" width={300} height={420} photoSize={230} />
          <Connector color="#FF1E27" height={56} />
          <div style={{ width: "min(92%, 1280px)", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,30,39,0.35), transparent)" }} />
        </div>

        {/* ── TIER 2: Departments ───────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 0 }}>
          <TierLabel label="Departments" sub="Click to explore team members" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(12px, 2vw, 22px)", justifyContent: "center", alignItems: "flex-start", width: "100%", maxWidth: 1260 }}>
            {DEPARTMENTS.map((dept, i) => (
              <DepartmentCard key={dept.id} dept={dept} index={i} isActive={activeDept?.id === dept.id} onClick={() => toggleDept(dept)} />
            ))}
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <div style={{ marginTop: "clamp(64px, 9vw, 110px)", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}
          >
            YouTobia Multimedia P.L.C. — Addis Ababa, Ethiopia
          </motion.p>
        </div>
      </section>

      <DepartmentPanel dept={activeDept} onClose={() => setActiveDept(null)} />
    </>
  );
};

export default StaffHierarchy;
