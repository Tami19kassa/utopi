import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  ArrowDown, 
  ArrowUpRight, 
  Award, 
  HelpCircle, 
  Tv, 
  Cpu, 
  BookOpen, 
  Newspaper, 
  Gamepad2, 
  Sparkles, 
  Layers,
  Activity,
  ChevronRight
} from "lucide-react";
import { InteractiveYutobiaStage } from "./InteractiveYutobiaStage";

interface HeroProps {
  onPlayDemo: () => void;
  onNavigate: (sectionId: string) => void;
  gameScore: number;
  heroVideoUrl?: string;
  isBooting?: boolean;
}

export const HugeHero: React.FC<HeroProps> = ({
  onPlayDemo,
  onNavigate,
  gameScore,
  heroVideoUrl,
  isBooting = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [currentMottoIndex, setCurrentMottoIndex] = useState(0);
  const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);

  const mottos = [
    "UNIFYING CREATIVITY, TECHNOLOGY, ENTERTAINMENT, INFO & EDUCATION",
    "ቀናView • eTop production • የንታBarsiisaa • ምርXog • እንቆቅCash",
    "RE-IMAGINING MODERN MEDIA IN THE HORN OF AFRICA",
    "CRAFTING HIGH-CONTRAST DIGITAL EXPERIENCES"
  ];

  const subBrandsArray = [
    {
      id: "qenaview",
      name: "ቀናView",
      desc: "Premium native streaming with original cultural cinematic content & media services.",
      tag: "STREAMING HUB",
      icon: Tv,
      color: "#FF1E27",
      metric: "4K CINEMATICS",
    },
    {
      id: "etop",
      name: "eTop Production",
      desc: "Flagship content creation, commercial digital house, audio-visual masters.",
      tag: "CREATIVE STUDIO",
      icon: Cpu,
      color: "#E21D24",
      metric: "STUDIO STANDARD",
    },
    {
      id: "yenta",
      name: "የንታBarsiisaa",
      desc: "Interactive skills hub, specialized learning guides & technical capacity builder.",
      tag: "SKILLS HUB",
      icon: BookOpen,
      color: "#C90E16",
      metric: "CAPACITY BUILD",
    },
    {
      id: "mrxog",
      name: "ምርXog",
      desc: "Curated cultural updates, reliable global headlines, and news investigations.",
      tag: "JOURNAL HUB",
      icon: Newspaper,
      color: "#AA0C12",
      metric: "VETTED STREAM",
    },
    {
      id: "enqoqcash",
      name: "እንቆቅCash",
      desc: "Gamified real-time national trivia league. Compete, enrich your knowledge, and win.",
      tag: "GAMED PLAY",
      icon: Gamepad2,
      color: "#FF5C62",
      metric: "LIVE MATCHES",
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMottoIndex((prev) => (prev + 1) % mottos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const titleLine1 = "YOUTOBIA";
  const titleLine2 = "MULTIMEDIA";

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-[#FCFAF6] via-[#FAF8F3] to-[#F1EDE5] dark:from-[#060606] dark:via-[#080808] dark:to-[#0C0C0C] overflow-hidden flex flex-col justify-center pt-32 pb-20 px-4 sm:px-6 md:px-12 transition-colors duration-500"
    >
      {/* 1. ARCHITECTURAL BOUNDARY CORNER DECORATIONS */}
      <div className="absolute top-24 left-4 md:left-12 pointer-events-none select-none hidden sm:flex items-center gap-2 font-mono text-[9px] text-neutral-300 dark:text-white/10 z-20">
        <span>SYS.LAT: 9.0125° N</span>
        <span className="w-1 h-1 rounded-full bg-brand" />
        <span>SYS.LNG: 38.7597° E</span>
        <span className="w-1 h-1 rounded-full bg-brand" />
        <span className="text-[#FF1E27] font-semibold animate-pulse">ADDIS ABABA HEADQUARTERS</span>
      </div>

      <div className="absolute top-24 right-4 md:right-12 pointer-events-none select-none hidden sm:flex items-center gap-2 font-mono text-[9px] text-neutral-300 dark:text-white/10 z-20">
        <span>FRAME_STATE: RESOLVED</span>
        <span className="w-1.5 h-1.5 bg-[#FF1E27] rounded-full" />
        <span>LIVE_SYS_ID: #7BD168</span>
      </div>

      {/* 2. BACKGROUND VIDEO REFINEMENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          key={heroVideoUrl || "default-video"}
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.05] dark:opacity-[0.12] filter pointer-events-none transition-all duration-[1000s] hue-rotate-[340deg] contrast-125 saturate-125"
          src={heroVideoUrl || "https://cdn.pixabay.com/video/2021/04/12/70860-537333552_large.mp4"}
        />
        {/* Designer editorial overlay filtering */}
        <div className="absolute inset-0 bg-white/40 dark:bg-[#060606]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-white/95 dark:from-[#060606] dark:via-transparent dark:to-[#060606]" />
      </div>

      {/* 3. DYNAMIC CURSOR RADIAL NEON GRADIENT GLOW */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-1 opacity-70 dark:opacity-50"
        animate={{
          background: `radial-gradient(900px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,30,39,0.06) 0%, rgba(255,94,30,0.02) 40%, rgba(255,30,39,0) 80%)`
        }}
        transition={{ type: "tween", ease: "linear" }}
      />

      {/* Luxury dynamic floating background particles */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full filter blur-[130px] pointer-events-none bg-[#FF1E27]/[0.03] dark:bg-[#FF1E27]/[0.07] z-1"
        animate={{
          x: (mousePosition.x - 50) * 1.5,
          y: (mousePosition.y - 50) * 1.5,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 25 }}
        style={{ top: "10%", left: "15%" }}
      />

      <div className="absolute inset-0 huge-grid-pattern opacity-30 pointer-events-none z-1" />

      {/* Geometric background watermarks for rich context */}
      <div className="absolute right-[5%] top-[12%] text-[30rem] font-sans font-black tracking-tighter text-neutral-100/50 dark:text-neutral-900/[0.03] select-none pointer-events-none z-0 leading-none">
        05
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between flex-1 py-4">
        <motion.div 
          initial="hidden"
          animate={isBooting ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.25
              }
            }
          }}
          className="space-y-6 md:space-y-10"
        >
          
          {/* Subheader Badge layout combining fixed category and sliding high-tech mission */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } }
            }}
            className="flex flex-col md:flex-row md:items-center gap-4 pt-4 md:pt-0"
          >
            <div className="inline-flex items-center gap-2 bg-neutral-100/80 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/[0.06] px-4 py-2 rounded-full font-mono text-[10px] sm:text-xs tracking-widest text-[#FF1E27] font-bold shadow-xs shrink-0 self-start transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              <span>YOUTOBIA P.L.C. MULTIMEDIA CONGLOMERATE</span>
            </div>

            <div className="h-6 overflow-hidden relative min-w-[280px] sm:min-w-[400px] self-start md:self-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMottoIndex}
                  initial={{ y: 16, opacity: 0, filter: "blur(2px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -16, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 font-bold uppercase py-0.5"
                >
                  // {mottos[currentMottoIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Kinetic Font Headline with custom ease, clip-path and rotation variables */}
          <div className="space-y-1 relative">
            
            {/* Ambient Background Glow behind Title */}
            <div className="absolute inset-y-0 left-0 w-2/3 bg-[#FF1E27]/5 filter blur-[100px] pointer-events-none rounded-r-full" />

            {/* Line 1: YouTobia */}
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] tracking-tighter leading-[0.80] text-neutral-900 dark:text-white select-none transition-colors duration-500 flex flex-wrap origin-left">
              {titleLine1.split("").map((char, index) => (
                <div key={index} className="overflow-hidden inline-block py-2">
                  <motion.span
                    initial={{ y: "100%", opacity: 0, rotateZ: 12, rotateX: 20 }}
                    animate={{ y: 0, opacity: 1, rotateZ: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: index * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ 
                      y: -15,
                      scale: 1.12,
                      color: "#FF1E27",
                      textShadow: "0 10px 40px rgba(255,30,39,0.5)",
                      transition: { type: "spring", stiffness: 450, damping: 9 }
                    }}
                    className="inline-block transition-colors duration-200 cursor-pointer origin-bottom font-black"
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Line 2: Multimedia */}
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] tracking-tighter leading-[0.80] text-neutral-900 dark:text-white select-none relative transition-colors duration-500 flex flex-wrap origin-left">
              {titleLine2.split("").map((char, index) => (
                <div key={index} className="overflow-hidden inline-block py-2">
                  <motion.span
                    initial={{ y: "100%", opacity: 0, rotateZ: -12, rotateX: -20 }}
                    animate={{ y: 0, opacity: 1, rotateZ: 0, rotateX: 0 }}
                    transition={{
                      duration: 1.0,
                      delay: 0.2 + index * 0.04,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ 
                      y: -15,
                      scale: 1.12,
                      color: "#FF1E27",
                      textShadow: "0 10px 40px rgba(255,30,39,0.5)",
                      transition: { type: "spring", stiffness: 450, damping: 9 }
                    }}
                    className="inline-block transition-colors duration-200 cursor-pointer origin-bottom font-black"
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
              
              {/* Highlight interactive pulsing point dot */}
              <motion.span
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 1.2, stiffness: 180, damping: 8 }}
                whileHover={{ scale: 1.6, rotate: 90 }}
                className="inline-block text-[#FF1E27] ml-2 origin-center cursor-pointer"
              >
                .
              </motion.span>
            </h1>
          </div>

          {/* 4. MAIN EDITORIAL DISPLAY CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4 relative">
            
            {/* Left Column: Mission Description and Interactive Brand Ecosystem preview cards */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <div className="font-serif italic text-2xl sm:text-3.5xl text-neutral-800 dark:text-neutral-200 leading-snug tracking-tight max-w-xl transition-colors duration-500">
                  Uniting five specialized disciplines under a master system of craft, technology, sound, storytelling, and culture.
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-sans font-light max-w-xl transition-colors duration-500">
                  Based inside the Addis Ababa innovation vector, YouTobia Multimedia is driving a native holding architecture that serves entertainment, professional cinema streaming, education, and gamified engagement networks.
                </p>
              </div>

              {/* INTERACTIVE BRAND SELECTION MATRIX */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[9px] text-[#FF1E27] tracking-widest uppercase font-black">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Real-Time Sub-Brand Ecosystem Indicators // Hover to Inspect</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-2xl">
                  {subBrandsArray.map((brand) => {
                    const B_Icon = brand.icon;
                    const isActive = hoveredBrandId === brand.id;
                    return (
                      <div
                        key={brand.id}
                        onMouseEnter={() => setHoveredBrandId(brand.id)}
                        onMouseLeave={() => setHoveredBrandId(null)}
                        className="relative group/card cursor-pointer"
                      >
                        <motion.div
                          animate={{
                            y: isActive ? -6 : 0,
                            borderColor: isActive ? "rgba(255,30,39,0.4)" : "rgba(0,0,0,0.06)",
                            backgroundColor: isActive ? "rgba(255,30,39,0.02)" : "rgba(255,255,255,0.03)"
                          }}
                          className="p-3.5 rounded-xl border border-neutral-200/40 dark:border-white/[0.05] bg-white/[0.02] dark:bg-neutral-900/10 backdrop-blur-md flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-3 transition-shadow duration-300 select-none shadow-xs sm:h-28"
                        >
                          <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-4">
                            <div 
                              className="p-2.5 rounded-lg flex items-center justify-center transition-all duration-300"
                              style={{ 
                                backgroundColor: isActive ? `${brand.color}15` : "rgba(255,30,39,0.04)", 
                                color: isActive ? brand.color : "rgb(150,150,150)"
                              }}
                            >
                              <B_Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${isActive ? 'rotate-12 scale-110' : ''}`} />
                            </div>
                            <div className="text-left">
                              <div className="font-display font-semibold text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 transition-colors group-hover/card:text-[#FF1E27]">
                                {brand.name}
                              </div>
                              <span className="hidden sm:inline-block text-[8px] font-mono font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                                {brand.tag.split(" ")[0]}
                              </span>
                            </div>
                          </div>

                          <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 sm:hidden" />
                          
                          <div className="hidden sm:block text-[8px] font-mono font-bold text-[#FF1E27]/70 mt-auto">
                            {brand.metric}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                {/* EXQUISITE SLIDING DESCRIPTION OVERLAY PANEL */}
                <div className="h-16 relative max-w-2xl overflow-hidden rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200/25 dark:border-white/[0.04] p-3.5 flex items-center select-none backdrop-blur-xs">
                  <AnimatePresence mode="wait">
                    {hoveredBrandId ? (
                      <motion.div
                        key={hoveredBrandId}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-4 text-left"
                      >
                        <span className="inline-block w-1.5 h-8 bg-[#FF1E27] rounded-full shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#FF1E27] font-black block uppercase">
                            {subBrandsArray.find(b => b.id === hoveredBrandId)?.tag} SYSTEM DIRECTIVE
                          </span>
                          <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-350 font-sans tracking-wide leading-tight">
                            {subBrandsArray.find(b => b.id === hoveredBrandId)?.desc}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500 text-xs font-mono"
                      >
                        <Sparkles className="w-4 h-4 text-[#FF1E27] animate-pulse" />
                        <span>Move cursor over any sub-brand badge above to review its system purpose...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ACTION BUTTON COMPONENT WITH MAGNETIC NEON HOVER EFFECTS */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate("brand-ecosystem")}
                  className="relative overflow-hidden group/btn px-7 py-4 rounded-xl cursor-pointer bg-[#FF1E27] hover:bg-[#E21D24] text-white font-display font-bold select-none text-xs sm:text-sm tracking-widest leading-none flex items-center gap-2 transition-all duration-300 active:scale-95 shadow-lg shadow-red-950/20"
                >
                  <span>EXPLORE BRAND ECOSYSTEM</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>

                <button
                  onClick={onPlayDemo}
                  className="group/trivia px-7 py-4 rounded-xl cursor-pointer bg-neutral-100 dark:bg-neutral-900/40 hover:bg-neutral-200 dark:hover:bg-neutral-800/80 border border-neutral-200/60 dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 font-mono text-[11px] tracking-widest select-none flex items-center gap-2.5 transition-all duration-300"
                >
                  <span>PLAY TRIVIA GAME</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF1E27] transition-all group-hover/trivia:translate-x-0.5 group-hover/trivia:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>

            {/* Right Column: High-tech 3D Interactive Stage container */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95, rotate: -3 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: { type: "spring", stiffness: 90, damping: 14, delay: 0.2 }
                }
              }}
              className="lg:col-span-5 flex flex-col justify-center select-none"
            >
              <InteractiveYutobiaStage />
            </motion.div>
          </div>
        </motion.div>

        {/* 5. DESIGN FOREWORD SCROLL TICKER & METRIC DETAIL FOOT-BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-neutral-200/50 dark:border-white/[0.08] pt-8 mt-12 font-mono text-[10px] text-neutral-400 dark:text-neutral-500 transition-colors duration-500">
          <div className="flex items-center gap-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF1E27]"></span>
            </span>
            <span className="tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              YOUTOBIA NETWORKS // ONLINE REVISION ACTIVE
            </span>
            {gameScore > 0 && (
              <span className="bg-rose-50 border border-[#FF1E27]/20 dark:bg-[#FF1E27]/10 dark:border-[#FF1E27]/20 text-[#FF1E27] px-3 py-1 rounded-full text-[10px] font-bold">
                Your Demo Score: {gameScore} ETH / Coins
              </span>
            )}
          </div>

          <button
            onClick={() => onNavigate("studio")}
            className="flex items-center gap-2 hover:text-[#FF1E27] cursor-pointer group/nav transition-colors font-bold tracking-widest text-[#FF1E27]/80"
          >
            <span>DISCOVER CREATIVE LAB</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover/nav:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HugeHero;
