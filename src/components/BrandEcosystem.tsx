import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StaggeredLetters } from "./StaggeredLetterReveal";
import {
  Sparkles, Tv, Film, GraduationCap, BookOpen, Layers,
  Users, TrendingUp, Globe, ArrowRight, CheckCircle,
  HelpCircle, Play, Rocket, Palette, ShieldCheck,
} from "lucide-react";

interface SubBrand {
  id: string; num: string; title: string; amharicTitle?: string;
  subtitle: string; purpose: string; icon: React.ReactNode;
  color: string; bgGrad: string;
  pillars: { title: string; desc: string }[];
}

gsap.registerPlugin(ScrollTrigger);

const VALUE_ICONS: React.ReactNode[] = [
  <Rocket className="w-6 h-6" />,
  <Palette className="w-6 h-6" />,
  <Users className="w-6 h-6" />,
  <ShieldCheck className="w-6 h-6" />,
  <Globe className="w-6 h-6" />,
];

const CARD_ACCENTS = [
  { top: "#FF1E27", rgb: "255,30,39" },
  { top: "#f97316", rgb: "249,115,22" },
  { top: "#0ea5e9", rgb: "14,165,233" },
  { top: "#10b981", rgb: "16,185,129" },
  { top: "#8b5cf6", rgb: "139,92,246" },
];

type ValItem = { title: string; desc: string; bg: string; border: string; icon: React.ReactNode };

const SwirlPattern: React.FC<{ color: string }> = ({ color }) => (
  <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.28 }}
    viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    {[...Array(6)].map((_, row) =>
      [...Array(5)].map((_, col) => {
        const cx = col * 90 - 20, cy = row * 50 - 10;
        return (
          <g key={`${row}-${col}`} transform={`translate(${cx},${cy})`}>
            <path d="M 10,25 C 10,10 30,5 40,15 C 50,25 45,45 30,45 C 15,45 5,35 10,25 Z"
              fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 18,28 C 18,20 28,17 34,22 C 40,27 37,38 30,38 C 23,38 18,34 18,28 Z"
              fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
          </g>
        );
      })
    )}
  </svg>
);

const ValueCard: React.FC<{ val: ValItem; index: number; cardWidth?: string | number }> = ({ val, index, cardWidth }) => {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  return (
    <div className="val-card shrink-0 flex flex-col relative"
      style={{ width: cardWidth ?? "100%", height: 420, borderRadius: 24, overflow: "hidden", transformStyle: "preserve-3d",
        boxShadow: "0 2px 0 2px rgba(0,0,0,0.18),0 6px 0 4px rgba(0,0,0,0.12),0 28px 56px rgba(0,0,0,0.55),0 8px 24px rgba(0,0,0,0.3)" }}>
      <div style={{ flex: "0 0 55%", position: "relative",
        background: `linear-gradient(145deg, ${accent.top} 0%, ${accent.top}cc 100%)`,
        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <SwirlPattern color="rgba(255,255,255,0.9)" />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(255,255,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, width: 68, height: 68, borderRadius: "50%",
          background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.5)",
          backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {VALUE_ICONS[index] ?? val.icon}
        </div>
        <div style={{ position: "relative", zIndex: 2,
          background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 100, padding: "3px 12px" }}>
          <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.9)", textTransform: "uppercase", fontWeight: 700 }}>
            VALUE.{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div style={{ flex: 1, background: "#fff", padding: "20px 24px",
        display: "flex", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1,
          background: `linear-gradient(90deg, ${accent.top}40, transparent)` }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent.top,
            flexShrink: 0, boxShadow: `0 0 6px ${accent.top}80` }} />
          <h4 style={{ fontWeight: 800, fontSize: 17, color: "#1a1a1a", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {val.title}
          </h4>
        </div>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${accent.top}30, transparent)` }} />
        <p style={{ fontSize: 12, color: "#6b6b6b", lineHeight: 1.65, fontWeight: 300, flex: 1 }}>{val.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 6 }}>
          <span style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.2em", color: accent.top, textTransform: "uppercase", fontWeight: 700 }}>
            YouTobia P.L.C.
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.12em", color: "#c4c4c4", textTransform: "uppercase" }}>
            {String(index + 1).padStart(2, "0")} / 05
          </span>
        </div>
      </div>
    </div>
  );
};

const ValuesDesktopScroll: React.FC<{ values: ValItem[] }> = ({ values }) => {
  const pinRef     = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const blob1Ref   = useRef<HTMLDivElement>(null);
  const blob2Ref   = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pin = pinRef.current, track = trackRef.current, bg = bgRef.current;
    const blob1 = blob1Ref.current, blob2 = blob2Ref.current, counter = counterRef.current;
    if (!pin || !track || !bg || !blob1 || !blob2 || !counter) return;

    const cardEls = Array.from(track.querySelectorAll<HTMLElement>(".val-card"));
    const n = values.length;
    const rgbs = CARD_ACCENTS.map(a => a.rgb);

    gsap.set(track,   { xPercent: 65 });
    gsap.set(cardEls, { rotateY: 22, y: 80, opacity: 0, scale: 0.88, transformPerspective: 1200 });
    gsap.set(blob1,   { x: "60%", y: "20%", scale: 1 });
    gsap.set(blob2,   { x: "-20%", y: "70%", scale: 0.8 });
    gsap.set(counter, { y: 0 });

    const ctx = gsap.context(() => {
      const endXPct = -(100 * (n - 1)) / n;
      const tl = gsap.timeline();

      // 1. Horizontal card sweep
      tl.to(track, { xPercent: endXPct, ease: "none", duration: n }, 0);

      // 2. Cards rise from below + rotateY unwind
      tl.to(cardEls, {
        y: 0, opacity: 1, scale: 1, rotateY: 0,
        duration: 0.85, ease: "power3.out",
        stagger: { each: 1, from: "start" },
      }, 0);

      // 3. Passed cards drift upward + fade out
      tl.to(cardEls, {
        y: -30, opacity: 0.38,
        duration: 0.5, ease: "power1.in",
        stagger: { each: 1, from: "start" },
      }, n * 0.6);

      // 4. BG gradient morphs per card colour
      rgbs.forEach((rgb, i) => {
        tl.to(bg, {
          background: `radial-gradient(ellipse 90% 80% at 50% 50%, rgba(${rgb},0.14) 0%, #020202 75%)`,
          duration: 1, ease: "power1.inOut",
        }, i);
      });

      // 5. Blob 1 parallax drift (right-top to left-bottom)
      tl.to(blob1, { x: "-15%", y: "65%", scale: 1.3, duration: n, ease: "none" }, 0);

      // 6. Blob 2 counter drift (adds depth)
      tl.to(blob2, { x: "55%", y: "5%", scale: 1.15, duration: n, ease: "none" }, 0);

      // 7. Vertical counter snaps per card (clear vertical progress signal)
      tl.to(counter, { y: `-${(n - 1) * 100}%`, duration: n, ease: `steps(${n - 1})` }, 0);

      // 8. Section label floats upward as user progresses
      if (labelRef.current) {
        tl.to(labelRef.current, { y: -28, opacity: 0.35, duration: n, ease: "none" }, 0);
      }

      ScrollTrigger.create({
        trigger: pin, start: "top top",
        end: () => `+=${window.innerHeight * n * 1.9}`,
        pin: true, scrub: 1.6, animation: tl, anticipatePin: 1,
      });
    }, pin);

    return () => ctx.revert();
  }, [values.length]);

  return (
    <div ref={pinRef} style={{ width: "100%", height: "100vh", overflow: "hidden",
      position: "relative", display: "flex", flexDirection: "column",
      justifyContent: "center", background: "#020202" }}>

      {/* Colour-morphing radial gradient */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 90% 80% at 50% 50%, rgba(${CARD_ACCENTS[0].rgb},0.14) 0%, #020202 75%)`,
        pointerEvents: "none" }} />

      {/* Blob 1 */}
      <div ref={blob1Ref} style={{ position: "absolute", width: "55vw", height: "55vw", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${CARD_ACCENTS[0].rgb},0.18) 0%, transparent 65%)`,
        pointerEvents: "none", filter: "blur(64px)", willChange: "transform" }} />

      {/* Blob 2 */}
      <div ref={blob2Ref} style={{ position: "absolute", width: "38vw", height: "38vw", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${CARD_ACCENTS[2].rgb},0.14) 0%, transparent 65%)`,
        pointerEvents: "none", filter: "blur(44px)", willChange: "transform" }} />

      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize: "48px 48px" }} />

      {/* Vertical counter */}
      <div style={{ position: "absolute", right: "clamp(20px,4vw,60px)",
        top: 0, bottom: 0, overflow: "hidden", height: "100vh", pointerEvents: "none",
        display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <div ref={counterRef} style={{ display: "flex", flexDirection: "column", willChange: "transform" }}>
          {values.map((v, i) => (
            <div key={i} style={{ height: "100vh", display: "flex", alignItems: "center",
              justifyContent: "center", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: "monospace", fontWeight: 900, lineHeight: 1,
                fontSize: "clamp(4rem,9vw,10rem)", color: "rgba(255,255,255,0.04)",
                letterSpacing: "-0.05em", userSelect: "none" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em",
                color: CARD_ACCENTS[i].top, opacity: 0.55, textTransform: "uppercase", userSelect: "none" }}>
                {v.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section label */}
      <div ref={labelRef} className="px-8 md:px-16 mb-10 shrink-0" style={{ position: "relative", zIndex: 2 }}>
        <span className="font-mono text-[10px] tracking-widest text-[#FF1E27] font-bold uppercase">
          HOLDING QUALITY PILLARS // SCROLL TO EXPLORE
        </span>
      </div>

      {/* Card track */}
      <div style={{ perspective: 1400, perspectiveOrigin: "50% 45%", overflow: "hidden", position: "relative", zIndex: 2 }}>
        <div ref={trackRef} style={{ display: "flex", flexWrap: "nowrap", gap: 28,
          paddingLeft: "10vw", paddingRight: "10vw", paddingBottom: "3rem",
          willChange: "transform", alignItems: "center" }}>
          {values.map((val, i) => (
            <ValueCard key={val.title} val={val} index={i} cardWidth="clamp(280px,26vw,360px)" />
          ))}
        </div>
      </div>

      {/* Progress bar dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ pointerEvents: "none", zIndex: 2 }}>
        {values.map((_, i) => (
          <div key={i} style={{ height: 3, width: 32, borderRadius: 100, background: `${CARD_ACCENTS[i].top}35` }} />
        ))}
      </div>
    </div>
  );
};

const ValuesMobileStack: React.FC<{ values: ValItem[] }> = ({ values }) => (
  <div className="px-5 py-8 space-y-5">
    <span className="font-mono text-[10px] tracking-widest text-[#FF1E27] font-bold uppercase block mb-6">
      HOLDING QUALITY PILLARS
    </span>
    {values.map((val, i) => (
      <motion.div key={val.title}
        initial={{ opacity: 0, y: 50, rotateX: 14, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 900 }}>
        <ValueCard val={val} index={i} />
      </motion.div>
    ))}
  </div>
);

const ValuesHorizontalScroll: React.FC<{ values: ValItem[] }> = ({ values }) => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return isMobile ? <ValuesMobileStack values={values} /> : <ValuesDesktopScroll values={values} />;
};

export const BrandEcosystem: React.FC<{ onPlayDemo?: () => void }> = ({ onPlayDemo }) => {
  const [activeBrandId, setActiveBrandId] = useState<string>("enqoq");

  const parentValues: ValItem[] = [
    { title: "Innovation", desc: "Pushing boundaries in multimedia technologies and trends.", bg: "bg-red-500/5", border: "border-red-500/10", icon: <TrendingUp className="w-5 h-5 text-[#FF1E27]" /> },
    { title: "Creativity", desc: "Fostering original, high-quality content creation.", bg: "bg-orange-500/5", border: "border-orange-500/10", icon: <Sparkles className="w-5 h-5 text-orange-500" /> },
    { title: "Collaboration", desc: "Building strong partnerships across the multimedia landscape.", bg: "bg-blue-500/5", border: "border-blue-500/10", icon: <Users className="w-5 h-5 text-blue-500" /> },
    { title: "Integrity", desc: "Upholding transparency and trust in every endeavor.", bg: "bg-green-500/5", border: "border-green-500/10", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { title: "Diversity & Inclusion", desc: "Promoting a wide range of voices, ideas, and perspectives.", bg: "bg-purple-500/5", border: "border-purple-500/10", icon: <Globe className="w-5 h-5 text-purple-500" /> },
  ];

  const subBrands: SubBrand[] = [
    { id: "enqoq", num: "01", title: "EnqoqCash", amharicTitle: "እንቆቅCash", subtitle: "Flagship Interactive Quiz Ecosystem",
      purpose: "EnqoqCash is a regulated, multi-platform, knowledge-driven trivia network designed to connect and reward intellect.",
      icon: <HelpCircle className="w-6 h-6 text-white" />, color: "#FF1E27", bgGrad: "from-rose-600 to-red-700",
      pillars: [
        { title: "Intellect Rewards", desc: "Monetizing and celebrating cognitive trivia depth." },
        { title: "Multi-Platform Scope", desc: "Seamless accessibility across web, mobile, and television." },
        { title: "General Knowledge", desc: "Curating verified trivia on History, Science, Sports, and Culture." },
        { title: "Trivia Network", desc: "Regulated framework driving trustworthy, high-engagement competitions." },
      ]},
    { id: "qenaview", num: "02", title: "QenaView", amharicTitle: "ቀናView", subtitle: "Multimedia Streaming & Distribution",
      purpose: "To revolutionize how people access and experience multimedia content with a technologically advanced, user-friendly platform.",
      icon: <Tv className="w-6 h-6 text-white" />, color: "#0284c7", bgGrad: "from-sky-500 to-blue-600",
      pillars: [
        { title: "Accessibility", desc: "Content accessible to a diverse global audience anywhere, anytime." },
        { title: "Quality", desc: "High-definition, premium content delivery across all genres." },
        { title: "Innovation", desc: "Exploring new streaming technologies and immersive experiences." },
        { title: "User-Centric", desc: "Tailored experiences crafted around user preferences." },
      ]},
    { id: "etop", num: "03", title: "eTop Production", amharicTitle: "eTop production", subtitle: "Multimedia Content Production",
      purpose: "To become a leading multimedia production house creating compelling stories and fostering a creative ecosystem.",
      icon: <Film className="w-6 h-6 text-white" />, color: "#f97316", bgGrad: "from-orange-500 to-amber-600",
      pillars: [
        { title: "Creativity", desc: "Bold, innovative, original content that captivates communities." },
        { title: "Collaboration", desc: "Fusing diverse talents to produce world-class multimedia." },
        { title: "Excellence", desc: "Maintaining the highest standards in every phase of production." },
        { title: "Sustainability", desc: "Adopting eco-friendly, socially responsible production practices." },
      ]},
    { id: "yenta", num: "04", title: "YentaBarsiisaa", amharicTitle: "የንታBarsissa", subtitle: "Multimedia Skills & Education Hub",
      purpose: "To be the premier hub for multimedia education where professionals learn the latest skills and techniques.",
      icon: <GraduationCap className="w-6 h-6 text-white" />, color: "#8b5cf6", bgGrad: "from-purple-500 to-violet-600",
      pillars: [
        { title: "Empowerment", desc: "Equipping learners with technical, creative, and commercial skills." },
        { title: "Innovation", desc: "Deploying cutting-edge tools and modern methods for media arts education." },
        { title: "Inclusion", desc: "Guaranteeing opportunities for learners from all backgrounds." },
        { title: "Lifelong Learning", desc: "Nurturing continuous skill development in a fast-evolving landscape." },
      ]},
    { id: "mirxog", num: "05", title: "MirXog", amharicTitle: "ምርXog", subtitle: "Multimedia Information Hub",
      purpose: "To serve as the go-to information hub for all things multimedia, helping creators and businesses stay ahead.",
      icon: <BookOpen className="w-6 h-6 text-white" />, color: "#10b981", bgGrad: "from-teal-500 to-emerald-600",
      pillars: [
        { title: "Accuracy", desc: "Well-researched, reliable, and up-to-date industry insights." },
        { title: "Transparency", desc: "Clear, unbiased insights and independent reporting." },
        { title: "Community", desc: "Forging a trusted network of multimedia experts and enthusiasts." },
        { title: "Curiosity", desc: "Encouraging exploration and discovery of emerging styles and standards." },
      ]},
  ];

  const visionForward = [
    { title: "Create", desc: "Original, high-quality multimedia content.", textCol: "text-red-500" },
    { title: "Stream", desc: "Accessible, immersive viewing experiences.", textCol: "text-sky-500" },
    { title: "Educate", desc: "Empower learners at every level.", textCol: "text-purple-500" },
    { title: "Inform", desc: "Trusted insights for the multimedia world.", textCol: "text-emerald-500" },
  ];

  const activeBrand = subBrands.find(b => b.id === activeBrandId) || subBrands[0];

  return (
    <section id="brand-ecosystem"
      className="relative py-28 md:py-40 bg-linear-to-b from-[#FAF8F3] via-[#FCFAF6] to-[#F3F0E8] dark:from-[#060606] dark:via-[#090909] dark:to-[#060606] border-t border-neutral-200/45 dark:border-white/5 transition-colors duration-500">
      <div className="absolute inset-0 huge-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute left-[3%] top-[40%] text-neutral-100 font-display font-black text-[12rem] xl:text-[20rem] leading-none select-none pointer-events-none tracking-tighter uppercase">PLC</div>

      <div className="max-w-7xl mx-auto space-y-32 relative z-10 px-6 md:px-12">
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-zinc-200 pb-12">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-semibold">SYSTEM PORTFOLIO: THE OVERSEER (P.L.C.)</span>
              <h2 className="font-serif italic text-4xl sm:text-6xl text-neutral-900 tracking-tight leading-none">
                <StaggeredLetters text="YouTobia Multimedia" /> <br />
                <span className="text-[#FF1E27] font-display font-black tracking-tighter uppercase not-italic">
                  <StaggeredLetters text="P.L.C. Holdings" delay={0.3} />
                </span>.
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-5">
              <p className="font-serif text-lg leading-relaxed text-zinc-700 italic">
                "A bold vision uniting creativity, technology, entertainment, information, and education."
              </p>
              <div className="p-5 bg-white border border-rose-100/40 rounded-xl shadow-xs">
                <span className="block font-mono text-[9px] tracking-widest text-[#FF1E27] font-bold uppercase mb-1">OUR CONSOLIDATED PURPOSE</span>
                <p className="text-zinc-600 text-sm leading-relaxed font-light">
                  To become a leading force in the multimedia industry by delivering exceptional content, innovative tools, and trusted information.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <span className="font-mono text-xs text-zinc-400 block tracking-widest">HOLDING QUALITY PILLARS</span>
            <h3 className="font-serif italic text-2xl text-zinc-800">Our Core Unifying Values</h3>
          </div>
        </div>
      </div>

      <ValuesHorizontalScroll values={parentValues} />

      <div className="max-w-7xl mx-auto space-y-32 relative z-10 px-6 md:px-12">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-semibold">02 / SUBSIDIARY SUB-BRANDS</span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-neutral-900 tracking-tight">
              <StaggeredLetters text="The 5 Specialized Ecosystem Segments" />
            </h2>
            <p className="text-zinc-550 max-w-xl text-sm font-sans font-light">
              Each YouTobia sub-brand carries a distinct operational license and creative identity.
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-8%" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-4 flex flex-col gap-3">
              {subBrands.map(brand => {
                const isActive = brand.id === activeBrandId;
                return (
                  <motion.button key={brand.id}
                    variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } }}
                    onClick={() => setActiveBrandId(brand.id)}
                    className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all duration-300 group cursor-pointer ${isActive ? "bg-white border-[#FF1E27] shadow-md scale-102" : "bg-white/60 hover:bg-white border-zinc-200"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isActive ? "text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"}`}
                        style={isActive ? { backgroundColor: brand.color } : {}}>
                        {isActive ? brand.icon : <Layers className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif italic text-base text-zinc-800 font-bold">{brand.title}</span>
                          {brand.amharicTitle && <span className="text-[11px] font-mono font-black text-[#FF1E27] px-1 bg-red-50 rounded">{brand.amharicTitle}</span>}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-450 block truncate max-w-[190px]">{brand.subtitle}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform ${isActive ? "text-[#FF1E27] translate-x-1" : ""}`} />
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm relative min-h-[460px] flex flex-col justify-between overflow-hidden">
              <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 text-zinc-900 font-serif italic text-[12rem] select-none uppercase">{activeBrand.num}</div>
              <AnimatePresence mode="wait">
                <motion.div key={activeBrand.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="space-y-8">
                  <div className="flex items-center justify-between border-b border-zinc-150 pb-5">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-black">SUB-BRAND PORTFOLIOS // {activeBrand.num} OF 05</span>
                      <h3 className="font-serif italic text-3xl text-zinc-900 font-extrabold flex items-center gap-2">
                        {activeBrand.title}
                        {activeBrand.amharicTitle && <span className="not-italic text-lg text-[#FF1E27] font-display font-black bg-red-50 px-2 py-0.5 rounded-lg border border-red-500/10">{activeBrand.amharicTitle}</span>}
                      </h3>
                      <p className="text-sm font-mono text-zinc-500 font-bold">{activeBrand.subtitle}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: activeBrand.color }}>{activeBrand.icon}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] tracking-widest text-[#FF1E27] font-bold uppercase block">OPERATIONAL FOCUS & PURPOSE</span>
                    <p className="font-serif text-lg md:text-xl text-zinc-800 italic leading-relaxed">"{activeBrand.purpose}"</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-[#FF1E27] uppercase font-black block">CORE STRATEGIC PILLARS</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group/deck">
                      {activeBrand.pillars.map((pil, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.08 }}
                          whileHover={{ scale: 1.025, y: -4, zIndex: 10 }}
                          className="relative overflow-hidden bg-white border border-neutral-200/60 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 group/item cursor-pointer min-h-[140px] group-hover/deck:opacity-60 hover:opacity-100!">
                          <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl opacity-60 group-hover/item:opacity-100 transition-all duration-300" style={{ backgroundColor: activeBrand.color }} />
                          <div className="absolute right-4 top-1 text-[4rem] font-mono font-black select-none pointer-events-none leading-none opacity-[0.05] group-hover/item:opacity-[0.12] transition-opacity duration-500 italic" style={{ color: activeBrand.color }}>0{idx + 1}</div>
                          <div className="space-y-2 relative z-10">
                            <span className="text-[8.5px] font-mono tracking-[0.15em] uppercase font-bold" style={{ color: activeBrand.color }}>{activeBrand.title.toUpperCase().slice(0, 10)} // 0{idx + 1}</span>
                            <h4 className="font-serif italic text-[16px] text-zinc-900 group-hover/item:text-[#FF1E27] font-semibold tracking-tight transition-colors">{pil.title}</h4>
                          </div>
                          <p className="text-zinc-500 text-xs leading-relaxed font-light pt-2.5 border-t border-dashed border-neutral-200/50 relative z-10">{pil.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="pt-8 border-t border-zinc-150 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">// YouTobia Enterprise Protocol SYNCED</span>
                {activeBrand.id === "enqoq" ? (
                  <button onClick={onPlayDemo} className="flex items-center gap-2 bg-[#FF1E27] hover:bg-[#C90E16] text-white font-display font-medium text-xs px-5 py-3 rounded-lg transition-all cursor-pointer shadow-md">
                    <Play className="w-3.5 h-3.5 fill-white" /><span>LAUNCH INTERACTIVE QUIZ</span>
                  </button>
                ) : (
                  <a href="#connect" className="inline-flex items-center gap-2 border border-zinc-200 hover:border-zinc-350 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-mono tracking-widest px-5 py-3 rounded-lg transition-all">
                    <span>ACQUIRE SERVICE RIGHTS</span><ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="bg-[#0c0c0c] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-xl border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,30,39,0.1),transparent_70%)] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />COMMITTED PATHWAYS
              </span>
              <h3 className="font-serif italic text-4xl sm:text-5xl text-white tracking-tight leading-none">
                <StaggeredLetters text="The Vision" /> <br />
                <span className="font-display font-black tracking-tighter uppercase not-italic text-[#FF1E27]">
                  <StaggeredLetters text="Forward" delay={0.25} />
                </span>.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light pt-2 max-w-sm">
                We unify five integrated sub-brands into one cohesive loop — facilitating content design, worldwide streaming, modern training, and news delivery.
              </p>
            </motion.div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
              {visionForward.map((vis, i) => (
                <motion.div key={vis.title}
                  variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } }}
                  className="bg-zinc-900/55 border border-white/4 p-5 rounded-2xl space-y-2 hover:border-[#FF1E27]/30 transition-all select-none">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-zinc-500">0{i + 1}</span>
                    <h4 className={`font-serif italic text-xl ${vis.textCol}`}>{vis.title}</h4>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed font-light">{vis.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandEcosystem;
