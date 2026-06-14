import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronUp, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface StaffMember {
  id: string;
  name: string;
  role: string;
  photo: string; // URL or initials fallback key
  bio: string;
}

interface Department {
  id: string;
  name: string;
  color: string;
  lead: StaffMember;
  team: StaffMember[];
}

interface Tier1Member {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXECUTIVES: Tier1Member[] = [
  {
    id: "exec-1",
    name: "Tamiru Kassahun",
    role: "Founder & Chief Executive Officer",
    photo: "",
    bio: "Visionary entrepreneur and multimedia architect based in Addis Ababa. Founded YouTobia with the mission to unify Ethiopia's creative, educational, and entertainment industries under one digital conglomerate. Over a decade of experience in media production, digital strategy, and cultural enterprise development.",
  },
  {
    id: "exec-2",
    name: "Helina Tesfaye",
    role: "Co-Founder & Chief Creative Officer",
    photo: "",
    bio: "Award-winning creative director and brand strategist. Helina leads the aesthetic vision of YouTobia, overseeing the design language, content philosophy, and brand identity across all five sub-brands. Former creative lead at pan-African media houses.",
  },
];

const DEPARTMENTS: Department[] = [
  {
    id: "qenaview",
    name: "ቀናView",
    color: "#0284c7",
    lead: {
      id: "qv-lead",
      name: "Dawit Alemu",
      role: "Head of Streaming & Distribution",
      photo: "",
      bio: "Streaming technology specialist with deep expertise in CDN infrastructure, adaptive bitrate delivery, and OTT platform architecture. Built ቀናView's technical backbone from the ground up.",
    },
    team: [
      {
        id: "qv-1",
        name: "Mekdes Girma",
        role: "Senior Platform Engineer",
        photo: "",
        bio: "Full-stack engineer specializing in real-time video processing pipelines and cloud infrastructure. Key architect of ቀናView's multi-region delivery system.",
      },
      {
        id: "qv-2",
        name: "Berhane Wolde",
        role: "UX Designer",
        photo: "",
        bio: "Product designer focused on intuitive streaming interfaces. Responsible for ቀናView's acclaimed minimal-yet-rich user experience across web and mobile.",
      },
      {
        id: "qv-3",
        name: "Selam Haile",
        role: "Content Acquisition Lead",
        photo: "",
        bio: "Cultural content curator and licensing specialist. Selam oversees all original programming partnerships and content rights management for ቀናView.",
      },
    ],
  },
  {
    id: "etop",
    name: "eTop Production",
    color: "#f97316",
    lead: {
      id: "etop-lead",
      name: "Yonas Bekele",
      role: "Head of Production",
      photo: "",
      bio: "Award-winning filmmaker and audio-visual director. Yonas has directed over 50 commercial and cultural projects across East Africa, bringing cinematic excellence to every eTop production.",
    },
    team: [
      {
        id: "etop-1",
        name: "Tigist Mengistu",
        role: "Cinematographer",
        photo: "",
        bio: "Renowned visual storyteller with a signature style that blends contemporary African aesthetics with global production standards. Shot campaigns for major Ethiopian brands.",
      },
      {
        id: "etop-2",
        name: "Abel Tadesse",
        role: "Sound Designer",
        photo: "",
        bio: "Award-winning audio engineer and composer. Abel crafts immersive soundscapes for film, commercial, and branded content, elevating every eTop Production project.",
      },
    ],
  },
  {
    id: "yenta",
    name: "የንታBarsiisaa",
    color: "#8b5cf6",
    lead: {
      id: "yenta-lead",
      name: "Feven Hailu",
      role: "Head of Education & Skills",
      photo: "",
      bio: "Education technologist and curriculum designer with a passion for democratizing creative skills across Ethiopia. Feven built the YentaBarsiisaa learning architecture from scratch.",
    },
    team: [
      {
        id: "yenta-1",
        name: "Robel Tesfaw",
        role: "Curriculum Developer",
        photo: "",
        bio: "Instructional designer specializing in multimedia and visual arts education. Robel develops the core modules that equip thousands of Ethiopian creators with industry-ready skills.",
      },
      {
        id: "yenta-2",
        name: "Lidiya Solomon",
        role: "Learning Experience Designer",
        photo: "",
        bio: "UX researcher and digital learning strategist. Lidiya ensures every lesson on the platform is engaging, accessible, and outcome-driven for creators at all skill levels.",
      },
    ],
  },
  {
    id: "mirxog",
    name: "ምርXog",
    color: "#10b981",
    lead: {
      id: "mirxog-lead",
      name: "Natnael Bekele",
      role: "Head of Information & Media",
      photo: "",
      bio: "Investigative journalist and media analyst with fifteen years covering Ethiopia's technology and cultural landscape. Natnael leads ምርXog's editorial vision and accuracy standards.",
    },
    team: [
      {
        id: "mirxog-1",
        name: "Hana Tesfaye",
        role: "Senior Journalist",
        photo: "",
        bio: "In-depth reporter covering the intersection of technology, arts, and society. Hana's investigative pieces have shaped public discourse on digital media in Ethiopia.",
      },
      {
        id: "mirxog-2",
        name: "Fikadu Mulatu",
        role: "Data Analyst",
        photo: "",
        bio: "Media intelligence specialist who transforms industry data into actionable insights. Fikadu powers ምርXog's analytics reports and trend forecasting engine.",
      },
    ],
  },
  {
    id: "enqoq",
    name: "እንቆቅCash",
    color: "#FF1E27",
    lead: {
      id: "enqoq-lead",
      name: "Biruk Assefa",
      role: "Head of Gaming & Rewards",
      photo: "",
      bio: "Game designer and behavioral economist who architected the እንቆቅCash trivia engine. Biruk blends cultural knowledge systems with gamification mechanics to create Ethiopia's most engaging quiz platform.",
    },
    team: [
      {
        id: "enqoq-1",
        name: "Abreham Girma",
        role: "Game Systems Engineer",
        photo: "",
        bio: "Backend engineer specializing in real-time scoring systems, anti-cheat mechanisms, and prize ledger infrastructure. Abreham ensures every game is fair, fast, and reliable.",
      },
      {
        id: "enqoq-2",
        name: "Bezawit Desta",
        role: "Community Manager",
        photo: "",
        bio: "Player experience specialist and community strategist. Bezawit manages the growing league of እንቆቅCash players, overseeing events, leaderboards, and player relations.",
      },
      {
        id: "enqoq-3",
        name: "Mikias Habtamu",
        role: "Question Curator",
        photo: "",
        bio: "Trivia expert and cultural researcher who builds and verifies the question database. Mikias ensures every riddle is culturally rich, factually accurate, and appropriately challenging.",
      },
    ],
  },
];

// ─── Avatar component — photo or initials fallback ───────────────────────────
const Avatar: React.FC<{ name: string; photo: string; size?: number; color?: string }> = ({
  name,
  photo,
  size = 56,
  color = "#FF1E27",
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 0 3px ${color}18`,
        overflow: "hidden",
        flexShrink: 0,
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span
          style={{
            fontWeight: 800,
            fontSize: size * 0.3,
            color,
            letterSpacing: "-0.02em",
            fontFamily: "inherit",
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
};

// ─── Tier-1 executive card ────────────────────────────────────────────────────
const ExecCard: React.FC<{ member: Tier1Member }> = ({ member }) => (
  <div
    style={{
      background: "#111111",
      border: "1px solid rgba(229,9,20,0.25)",
      borderRadius: 12,
      padding: "24px 20px",
      width: "clamp(240px, 22vw, 300px)",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      boxShadow: "0 20px 40px rgba(229,9,20,0.15), 0 4px 16px rgba(0,0,0,0.5)",
    }}
  >
    {/* Top accent */}
    <div
      style={{
        height: 2,
        background: "linear-gradient(90deg,#FF1E27,#ff6b6b)",
        borderRadius: 2,
        marginBottom: 2,
      }}
    />
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <Avatar name={member.name} photo={member.photo} size={52} color="#FF1E27" />
      <div>
        <p style={{ fontWeight: 800, color: "#fff", fontSize: 15, lineHeight: 1.2, marginBottom: 4 }}>
          {member.name}
        </p>
        <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.15em", color: "#FF1E27", textTransform: "uppercase" }}>
          {member.role}
        </p>
      </div>
    </div>
    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontWeight: 300 }}>
      {member.bio}
    </p>
  </div>
);

// ─── Tier-3 team member card ──────────────────────────────────────────────────
const TeamCard: React.FC<{ member: StaffMember; color: string }> = ({ member, color }) => (
  <div
    className="team-card"
    style={{
      background: "#0d0d0d",
      border: `1px solid ${color}25`,
      borderRadius: 10,
      padding: "18px 16px",
      width: "clamp(200px, 18vw, 240px)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      boxShadow: `0 12px 28px ${color}12, 0 2px 8px rgba(0,0,0,0.4)`,
      flexShrink: 0,
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <Avatar name={member.name} photo={member.photo} size={42} color={color} />
      <div>
        <p style={{ fontWeight: 700, color: "#fff", fontSize: 13, lineHeight: 1.2, marginBottom: 3 }}>
          {member.name}
        </p>
        <p style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.14em", color, textTransform: "uppercase" }}>
          {member.role}
        </p>
      </div>
    </div>
    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.6, fontWeight: 300 }}>
      {member.bio}
    </p>
  </div>
);

// ─── Connector SVG between tiers ──────────────────────────────────────────────
const VerticalConnector: React.FC<{ color?: string }> = ({ color = "#FF1E27" }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "4px 0",
    }}
  >
    <div
      style={{
        width: 1,
        height: 32,
        background: `linear-gradient(to bottom, ${color}80, ${color}20)`,
      }}
    />
  </div>
);

// ─── Tier-2 Department card with expand/collapse ──────────────────────────────
const DepartmentBranch: React.FC<{
  dept: Department;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ dept, isOpen, onToggle }) => {
  const teamRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate team reveal/hide
  useLayoutEffect(() => {
    const team = teamRef.current;
    if (!team) return;

    const cards = team.querySelectorAll<HTMLElement>(".team-card");

    if (isOpen) {
      // Expand: container height 0 → auto, cards stagger in
      gsap.set(team, { height: 0, overflow: "hidden" });
      gsap.to(team, {
        height: "auto",
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(team, { overflow: "visible" });
          // Refresh ScrollTrigger so page height recalculates
          ScrollTrigger.refresh();
        },
      });
      gsap.fromTo(
        cards,
        { opacity: 0, y: -24, rotateX: 15, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    } else {
      // Collapse
      gsap.set(team, { overflow: "hidden" });
      gsap.to(cards, {
        opacity: 0,
        y: -16,
        scale: 0.95,
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.in",
      });
      gsap.to(team, {
        height: 0,
        duration: 0.4,
        ease: "power3.in",
        delay: 0.15,
        onComplete: () => ScrollTrigger.refresh(),
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "clamp(200px, 18vw, 260px)",
      }}
    >
      {/* Tier-2 lead card */}
      <button
        onClick={onToggle}
        style={{
          width: "clamp(200px, 18vw, 240px)",
          background: isOpen ? dept.color : "#111111",
          border: `1px solid ${dept.color}40`,
          borderRadius: 10,
          padding: "16px 14px",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: isOpen
            ? `0 20px 40px ${dept.color}30, 0 4px 16px rgba(0,0,0,0.5)`
            : `0 8px 24px ${dept.color}10, 0 2px 8px rgba(0,0,0,0.4)`,
          transition: "background 0.3s, box-shadow 0.3s",
          position: "relative",
        }}
      >
        {/* Dept color bar */}
        <div
          style={{
            height: 2,
            background: isOpen
              ? "rgba(255,255,255,0.4)"
              : `linear-gradient(90deg,${dept.color},transparent)`,
            borderRadius: 2,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={dept.lead.name} photo={dept.lead.photo} size={40} color={isOpen ? "#fff" : dept.color} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, color: isOpen ? "#fff" : "#fff", fontSize: 13, lineHeight: 1.2, marginBottom: 3 }}>
              {dept.lead.name}
            </p>
            <p style={{
              fontFamily: "monospace", fontSize: 8, letterSpacing: "0.14em",
              color: isOpen ? "rgba(255,255,255,0.7)" : dept.color, textTransform: "uppercase",
            }}>
              {dept.lead.role}
            </p>
          </div>
          {isOpen
            ? <ChevronUp style={{ color: "rgba(255,255,255,0.6)", width: 14, height: 14, flexShrink: 0 }} />
            : <ChevronDown style={{ color: dept.color, width: 14, height: 14, flexShrink: 0 }} />
          }
        </div>

        {/* Dept name badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700,
            color: isOpen ? "rgba(255,255,255,0.5)" : `${dept.color}80`, textTransform: "uppercase",
          }}>
            {dept.name}
          </span>
          <span style={{
            fontFamily: "monospace", fontSize: 8, color: isOpen ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
          }}>
            {dept.team.length} members ↓
          </span>
        </div>
      </button>

      {/* Tier-3 team — animated container */}
      {isOpen && <VerticalConnector color={dept.color} />}

      <div
        ref={teamRef}
        style={{
          height: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        {dept.team.map((member) => (
          <TeamCard key={member.id} member={member} color={dept.color} />
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const StaffHierarchy: React.FC = () => {
  const [openDepts, setOpenDepts] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance animation for exec cards and dept row
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const execCards = section.querySelectorAll<HTMLElement>(".exec-card");
    const deptCards = section.querySelectorAll<HTMLElement>(".dept-card-wrapper");

    gsap.set(execCards, { opacity: 0, y: 40 });
    gsap.set(deptCards, { opacity: 0, y: 50 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(execCards, {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
          });
          gsap.to(deptCards, {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09, delay: 0.4,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleDept = useCallback((id: string) => {
    setOpenDepts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="staff"
      style={{
        background: "#080808",
        padding: "clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)",
        borderTop: "1px solid rgba(229,9,20,0.12)",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 64, maxWidth: 640 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Users style={{ color: "#FF1E27", width: 16, height: 16 }} />
          <span style={{
            fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em",
            color: "#FF1E27", fontWeight: 700, textTransform: "uppercase",
          }}>
            Our Team // Organizational Structure
          </span>
        </div>
        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em",
          lineHeight: 0.95, color: "#fff", marginBottom: 16,
        }}>
          The People Behind<br />
          <span style={{ color: "#FF1E27" }}>YouTobia.</span>
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontWeight: 300 }}>
          Click any department lead to expand their team. Our structure reflects our philosophy — executive vision flows into specialized branches, each operating with autonomy and excellence.
        </p>
      </div>

      {/* ── TIER 1: Executives ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 0 }}>
        <span style={{
          fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em",
          color: "rgba(229,9,20,0.5)", textTransform: "uppercase", marginBottom: 16, fontWeight: 700,
        }}>
          Tier 1 — Executive Leadership
        </span>

        {/* Exec cards row */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {EXECUTIVES.map((exec) => (
            <div key={exec.id} className="exec-card">
              <ExecCard member={exec} />
            </div>
          ))}
        </div>

        {/* Connector to T2 */}
        <VerticalConnector color="#FF1E27" />

        {/* Horizontal line spanning T2 */}
        <div style={{
          width: "min(90%, 1100px)", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(229,9,20,0.35), transparent)",
          marginBottom: 0,
        }} />
      </div>

      {/* ── TIER 2 + TIER 3: Departments ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 0 }}>
        <span style={{
          fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.2)", textTransform: "uppercase", margin: "12px 0 20px", fontWeight: 700,
        }}>
          Tier 2 — Department Leads // Click to Expand Team
        </span>

        {/* All 5 departments in a horizontal row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="dept-card-wrapper">
              <DepartmentBranch
                dept={dept}
                isOpen={openDepts.has(dept.id)}
                onToggle={() => toggleDept(dept.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 80, textAlign: "center" }}>
        <p style={{
          fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.15)", textTransform: "uppercase",
        }}>
          YouTobia Multimedia P.L.C. — Addis Ababa, Ethiopia
        </p>
      </div>
    </section>
  );
};

export default StaffHierarchy;
