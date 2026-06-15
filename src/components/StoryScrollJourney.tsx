import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronRight, Play, Tv, GraduationCap, BookOpen, Sparkles, Coins,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Panel data ────────────────────────────────────────────────────────────────
const PANELS = [
  {
    num: "01",
    badge: "CHAPTER I",
    title: "eTop & ቀናView",
    subtitle: "Create & Distribute",
    desc: "Our production division eTop crafts bold, original, sustainable content, while ቀናView serves as our advanced digital distribution network for high-resolution content playback globally.",
    Icon: Tv,
    bg: "#0a0a0a",
    rightBg: "#161616",
    accent: "#FF1E27",
    textColor: "#ffffff",
    tag: "STREAMING · PRODUCTION",
  },
  {
    num: "02",
    badge: "CHAPTER II",
    title: "የንታBarsiisaa",
    subtitle: "Learn & Empower",
    desc: "An inclusive educational academy equipping aspiring and seasoned creators with tools for media arts, visual engineering, and sound synthesis — career-defining lifelong learning.",
    Icon: GraduationCap,
    bg: "#ffffff",
    rightBg: "#f0f0f0",
    accent: "#FF1E27",
    textColor: "#111111",
    tag: "EDUCATION · SKILLS",
  },
  {
    num: "03",
    badge: "CHAPTER III",
    title: "ምርXog",
    subtitle: "Discover & Inform",
    desc: "The go-to reference source for up-to-date multimedia trend tracking, analysis, and insights — delivering vetted information to businesses, creators, and enthusiasts.",
    Icon: BookOpen,
    bg: "#FF1E27",
    rightBg: "#e0181f",
    accent: "#ffffff",
    textColor: "#ffffff",
    tag: "JOURNALISM · ANALYTICS",
  },
  {
    num: "04",
    badge: "CHAPTER IV",
    title: "እንቆቅCash",
    subtitle: "Gamify & Connect",
    desc: "Adapting Enqoqlsh riddles into a cutting-edge web trivia engine. Players challenge their knowledge, answer against rapid clocks, and unlock structural prizes on a regulated rewards ledger.",
    Icon: Sparkles,
    bg: "#0a0a0a",
    rightBg: "#161616",
    accent: "#FF1E27",
    textColor: "#ffffff",
    tag: "GAME · REWARDS",
  },
];

const N = PANELS.length;

export const StoryScrollJourney: React.FC<{ onPlayDemo: () => void }> = ({ onPlayDemo }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Total horizontal distance = full track width minus one visible panel width
    // Panel width = viewport minus horizontal padding on both sides (24px each = 48px total)
    const H_PAD = 24; // px each side
    const GAP = 16;   // gap between panels
    const panelW = window.innerWidth - H_PAD * 2;
    // Each step = one panel width + one gap
    const totalScrollWidth = (panelW + GAP) * (N - 1);

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        pin: true,
        scrub: 1,
        animation: tween,
        anticipatePin: 1,
        onUpdate: (self) => {
          setActiveIdx(Math.min(N - 1, Math.floor(self.progress * N)));
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story-journey"
      className="relative bg-[#FCFAF6] dark:bg-[#060606] transition-colors"
    >
      {/* ── Static header — sits above the pinned zone ── */}
      <div className="w-full px-8 sm:px-14 md:px-20 pt-20 pb-12 border-b border-neutral-200/40 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-widest text-[#FF1E27] font-bold flex items-center gap-2 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              02 / The Ecosystem Engines
            </span>
            <h2
              className="font-black tracking-tighter leading-[0.88] text-neutral-900 dark:text-white"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            >
              The Integrated<br />
              <span className="text-[#FF1E27]">Holdings Journey.</span>
            </h2>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-sm font-light">
            We unite storytelling, streaming, education, journalism, and
            gamified engagement into one holistic network built from Addis Ababa.
          </p>
        </div>
      </div>

      {/* ── Pinned viewport — GSAP pins this to top, clamps overflow ── */}
      <div
        ref={sectionRef}
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          /* Vertical + horizontal breathing room around the panels */
          padding: "20px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* ── Horizontal track — N panels wide, GSAP moves this left ── */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            flexDirection: "row",
            /* Each panel fills the padded inner width, not raw 100vw */
            width: `calc(${N} * (100vw - 48px) + ${(N - 1) * 16}px)`,
            height: "100%",
            willChange: "transform",
            gap: 16,
          }}
        >
          {PANELS.map((panel, i) => {
            const { Icon } = panel;
            return (
              <div
                key={panel.num}
                style={{
                  width: "calc(100vw - 48px)",
                  height: "100%",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "row",
                  overflow: "hidden",
                  position: "relative",
                  background: panel.bg,
                  borderRadius: 12,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                }}
              >
                {/* ── LEFT: text content ── */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "clamp(28px, 7vw, 88px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Watermark number */}
                  <div
                    style={{
                      position: "absolute",
                      right: -10,
                      bottom: -20,
                      fontSize: "clamp(7rem, 22vw, 20rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: panel.accent,
                      opacity: 0.04,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {panel.num}
                  </div>

                  {/* Badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 24,
                      padding: "4px 12px",
                      fontSize: 10,
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      fontWeight: 700,
                      textTransform: "uppercase" as const,
                      color: panel.accent,
                      border: `1px solid ${panel.accent}40`,
                      background: `${panel.accent}12`,
                      alignSelf: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: panel.accent,
                        flexShrink: 0,
                      }}
                    />
                    {panel.badge} — YouTobia Holdings
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: "clamp(2.4rem, 6vw, 6.5rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 0.92,
                      color: panel.textColor,
                      marginBottom: 14,
                    }}
                  >
                    {panel.title}
                  </h2>

                  {/* Subtitle */}
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: panel.textColor,
                      opacity: 0.5,
                      marginBottom: 20,
                    }}
                  >
                    {panel.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                      lineHeight: 1.72,
                      color: panel.textColor,
                      opacity: 0.7,
                      maxWidth: 440,
                      marginBottom: 28,
                      fontWeight: 300,
                    }}
                  >
                    {panel.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 28 }}>
                    {panel.tag.split(" · ").map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10,
                          fontFamily: "monospace",
                          letterSpacing: "0.2em",
                          padding: "4px 12px",
                          textTransform: "uppercase" as const,
                          fontWeight: 700,
                          color: panel.accent,
                          background: `${panel.accent}14`,
                          border: `1px solid ${panel.accent}35`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Counter */}
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: panel.textColor,
                      opacity: 0.28,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                  </span>
                </div>

                {/* ── RIGHT: icon card ── */}
                <div
                  style={{
                    width: "42%",
                    flexShrink: 0,
                    background: panel.rightBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Ambient glow */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 50% 50%, ${panel.accent}22 0%, transparent 65%)`,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Floating card */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    style={{
                      position: "relative",
                      zIndex: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 18,
                      padding: "clamp(24px, 4vw, 52px)",
                      background: panel.bg === "#ffffff" ? "#fff" : "#0e0e0e",
                      border: `1px solid ${panel.accent}30`,
                      boxShadow: `0 40px 100px ${panel.accent}20`,
                      width: "clamp(170px, 25vw, 310px)",
                      aspectRatio: "1",
                    }}
                  >
                    <Icon
                      style={{
                        color: panel.accent,
                        width: "clamp(40px, 6.5vw, 68px)",
                        height: "clamp(40px, 6.5vw, 68px)",
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          fontWeight: 900,
                          fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                          letterSpacing: "-0.02em",
                          color: panel.bg === "#ffffff" ? "#111" : "#fff",
                          lineHeight: 1.1,
                        }}
                      >
                        {panel.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: 9,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase" as const,
                          color: panel.bg === "#ffffff" ? "#111" : "#fff",
                          opacity: 0.38,
                          marginTop: 6,
                        }}
                      >
                        {panel.subtitle}
                      </p>
                    </div>

                    {panel.num === "04" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "5px 12px",
                          fontFamily: "monospace",
                          fontSize: 11,
                          fontWeight: 700,
                          color: panel.accent,
                          background: `${panel.accent}14`,
                          border: `1px solid ${panel.accent}40`,
                        }}
                      >
                        <Coins style={{ width: 14, height: 14 }} />
                        +1,500 ETB PRIZE
                      </div>
                    )}
                  </motion.div>

                  {/* Serial label */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 14,
                      right: 18,
                      fontFamily: "monospace",
                      fontSize: 9,
                      letterSpacing: "0.25em",
                      color: panel.accent,
                      opacity: 0.22,
                    }}
                  >
                    SERIES {panel.num}/04
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Progress dots ── */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={i}
              style={{
                height: 6,
                width: activeIdx === i ? 24 : 6,
                borderRadius: 3,
                background: activeIdx === i ? panel.accent : `${panel.accent}50`,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            right: 30,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 50,
            opacity: activeIdx === 0 ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>
      </div>

      {/* ── CTA below the pinned zone ── */}
      <div className="w-full px-8 sm:px-14 md:px-20 py-24 bg-[#FCFAF6] dark:bg-[#060606] border-t border-neutral-200/40 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-3">
            <h3
              className="font-black tracking-tighter text-neutral-900 dark:text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Ready to test<br />
              <span className="text-[#FF1E27]">your own mind?</span>
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm leading-relaxed font-light">
              General Knowledge, Sports, Science, and History challenges backed
              by high-stakes multipliers. Jump into the live trivia engine.
            </p>
          </div>
          <motion.button
            onClick={onPlayDemo}
            whileHover="hov"
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden flex items-center gap-3 px-10 py-5 text-sm font-bold tracking-widest cursor-pointer shrink-0"
            style={{ background: "#FF1E27", color: "#fff" }}
          >
            <motion.span
              className="absolute inset-0 bg-black"
              variants={{ hov: { scaleX: 1 }, rest: { scaleX: 0 } }}
              initial="rest"
              style={{ originX: 0 }}
              transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
            />
            <Play className="w-4 h-4 fill-white relative z-10" />
            <span className="relative z-10">LAUNCH ENQOQ CASH</span>
            <ChevronRight className="w-4 h-4 relative z-10" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default StoryScrollJourney;
