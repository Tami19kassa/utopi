import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Tv,
  Cpu,
  BookOpen,
  Newspaper,
  Gamepad2,
  Sparkles,
  Activity,
  ChevronRight,
  X,
  Send,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react";
import YutobiaLogo from "./YutobiaLogo";

interface HeroProps {
  onPlayDemo: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  gameScore: number;
  heroVideoUrl?: string;
  isBooting?: boolean;
  theme?: string;
  onToggleTheme?: () => void;
}

export const HugeHero: React.FC<HeroProps> = ({
  onPlayDemo,
  onNavigate,
  activeSection,
  gameScore,
  heroVideoUrl,
  isBooting = false,
  theme = "dark",
  onToggleTheme,
}) => {
  const [currentMottoIndex, setCurrentMottoIndex] = useState(0);
  const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTalkOpen, setIsTalkOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Brand Ecosystem", id: "brand-ecosystem" },
    { label: "Our Team", id: "studio" },
    { label: "Connect", id: "connect" },
  ];

  const mottos = [
    "UNIFYING CREATIVITY, TECHNOLOGY, ENTERTAINMENT, INFO & EDUCATION",
    "ቀናView • eTop production • የንታBarsiisaa • ምርXog • እንቆቅCash",
    "RE-IMAGINING MODERN MEDIA IN THE HORN OF AFRICA",
    "CRAFTING HIGH-CONTRAST DIGITAL EXPERIENCES",
  ];

  const subBrandsArray = [
    { id: "qenaview", name: "ቀናView", desc: "Premium native streaming with original cultural cinematic content & media services.", tag: "STREAMING HUB", icon: Tv, color: "#FF1E27", metric: "4K CINEMATICS" },
    { id: "etop", name: "eTop Production", desc: "Flagship content creation, commercial digital house, audio-visual masters.", tag: "CREATIVE STUDIO", icon: Cpu, color: "#E21D24", metric: "STUDIO STANDARD" },
    { id: "yenta", name: "የንታBarsiisaa", desc: "Interactive skills hub, specialized learning guides & technical capacity builder.", tag: "SKILLS HUB", icon: BookOpen, color: "#C90E16", metric: "CAPACITY BUILD" },
    { id: "mrxog", name: "ምርXog", desc: "Curated cultural updates, reliable global headlines, and news investigations.", tag: "JOURNAL HUB", icon: Newspaper, color: "#AA0C12", metric: "VETTED STREAM" },
    { id: "enqoqcash", name: "እንቆቅCash", desc: "Gamified real-time national trivia league. Compete, enrich your knowledge, and win.", tag: "GAMED PLAY", icon: Gamepad2, color: "#FF5C62", metric: "LIVE MATCHES" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentMottoIndex(p => (p + 1) % mottos.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => onNavigate(id), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => { setSubmitted(false); setIsTalkOpen(false); }, 4000);
    }, 1200);
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <header className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-50 flex items-start justify-between gap-2">
        {/* Left side: logo + menu — constrained so it never overflows */}
        <div
          className="flex items-stretch h-[48px] sm:h-[52px] min-w-0 overflow-hidden shrink"
          style={{
            background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.32)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick("home")}
            whileHover={{ backgroundColor: "#e0181f" }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center justify-center w-[48px] sm:w-[52px] h-full bg-[#FF1E27] shrink-0 cursor-pointer overflow-hidden"
            aria-label="Home"
          >
            <motion.div whileHover={{ scale: 1.15, rotate: -8 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
              <YutobiaLogo size={26} showText={false} />
            </motion.div>
          </motion.button>

          <AnimatePresence mode="wait">
            {!isMenuOpen ? (
              /* Collapsed: single "Menu" button */
              <motion.button
                key="menu-btn"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(true)}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                whileTap={{ scale: 0.96 }}
                className="relative flex items-center px-4 sm:px-5 text-white text-sm font-medium tracking-wide cursor-pointer whitespace-nowrap"
              >
                <span className="relative">
                  Menu
                  <motion.span className="absolute -bottom-0.5 left-0 h-px bg-white" initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.22 }} />
                </span>
              </motion.button>
            ) : (
              /* Expanded: nav links — scrollable horizontally on mobile */
              <motion.div
                key="nav-links"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-stretch overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.id;
                  const isHov = hoveredLink === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.045 }}
                      onClick={() => handleNavClick(link.id)}
                      onMouseEnter={() => setHoveredLink(link.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      whileTap={{ scale: 0.96 }}
                      className="relative flex items-center px-3 sm:px-4 text-xs sm:text-sm font-medium tracking-wide border-r border-white/10 cursor-pointer whitespace-nowrap overflow-hidden shrink-0"
                      style={{ color: isActive || isHov ? "#fff" : "rgba(255,255,255,0.7)" }}
                    >
                      <motion.span className="absolute inset-0 bg-white/10" initial={false} animate={{ scaleY: isHov ? 1 : 0 }} style={{ originY: 1 }} transition={{ duration: 0.2 }} />
                      <span className="relative z-10">{link.label}</span>
                      {isActive && <motion.span layoutId="nav-active-bar" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF1E27]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                    </motion.button>
                  );
                })}
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: navLinks.length * 0.045 }}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                  className="flex items-center justify-center w-[48px] sm:w-[52px] shrink-0 bg-white/10 text-white cursor-pointer"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                    <X className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side: theme toggle + Let's talk */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme toggle */}
          <motion.button
            onClick={onToggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Toggle theme"
            className="relative flex items-center justify-center h-[48px] sm:h-[52px] w-[48px] sm:w-[52px] cursor-pointer overflow-hidden"
            style={{
              background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.32)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sun className="w-4 h-4 text-white/70" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Moon className="w-4 h-4 text-white/70" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Let's talk */}
          <motion.button
            onClick={() => setIsTalkOpen(true)}
            whileHover="hov"
            initial="rest"
            animate="rest"
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-1.5 sm:gap-2 h-[48px] sm:h-[52px] px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wide cursor-pointer overflow-hidden text-white shrink-0"
            style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
          >
            <motion.span
              className="absolute inset-0"
              style={{ background: "#FF1E27" }}
              variants={{ hov: { opacity: 0 }, rest: { opacity: 1 } }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="absolute inset-0"
              style={{ background: "#16a34a", originX: 0 }}
              variants={{ hov: { scaleX: 1 }, rest: { scaleX: 0 } }}
              transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
            />
            <span className="relative z-10 whitespace-nowrap">Let's talk</span>
            <motion.div
              className="relative z-10"
              variants={{ hov: { x: 3, y: -3 }, rest: { x: 0, y: 0 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>
          </motion.button>
        </div>
      </header>

      {/* ── LET'S TALK MODAL ── */}
      <AnimatePresence>
        {isTalkOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="talk-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => { if (!submitted) setIsTalkOpen(false); }}
              className="fixed inset-0 z-60 bg-black/70"
              style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            />

            {/* Panel */}
            <motion.div
              key="talk-panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 z-61 w-full max-w-md flex flex-col"
              style={{
                background: "rgba(8,8,8,0.96)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "-24px 0 80px rgba(0,0,0,0.8)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between p-6 pb-5 shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#FF1E27] uppercase font-bold mb-1">
                    YouTobia Multimedia
                  </p>
                  <h2 className="text-xl font-display font-black text-white tracking-tight">
                    Let's Talk
                  </h2>
                </div>
                <button
                  onClick={() => setIsTalkOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,30,39,0.15)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,30,39,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", damping: 20, stiffness: 200 }}
                      className="h-full flex flex-col items-center justify-center text-center gap-5 py-16"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
                      >
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-black text-white mb-2">Message Sent!</h3>
                        <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                          Thank you for reaching out. The YouTobia team will get back to you shortly.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        Ready to collaborate or learn more? Drop us a message and we'll respond promptly.
                      </p>

                      {[
                        { id: "name", label: "Full Name *", placeholder: "e.g. Dawit Alemu", type: "text", required: true },
                        { id: "email", label: "Email Address *", placeholder: "you@example.com", type: "email", required: true },
                        { id: "company", label: "Company / Organisation", placeholder: "Optional", type: "text", required: false },
                      ].map((field) => (
                        <div key={field.id} className="space-y-1.5">
                          <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={(e) => setFormData((p) => ({ ...p, [field.id]: e.target.value }))}
                            className="w-full text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors duration-200"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 10,
                              padding: "11px 14px",
                            }}
                            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,30,39,0.5)"; }}
                            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                          />
                        </div>
                      ))}

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your project or inquiry…"
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          className="w-full text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors duration-200 resize-none"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 10,
                            padding: "11px 14px",
                          }}
                          onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,30,39,0.5)"; }}
                          onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading || !formData.name || !formData.email}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full text-white font-display font-bold py-3.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
                        style={{
                          background: "linear-gradient(135deg,#FF1E27,#c90e16)",
                          boxShadow: "0 8px 24px rgba(255,30,39,0.25)",
                        }}
                      >
                        {loading ? (
                          <span className="font-mono text-xs tracking-widest animate-pulse">SENDING…</span>
                        ) : (
                          <>
                            <span>SEND MESSAGE</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <div id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-end pb-16 px-6 sm:px-10 md:px-16">

        {/* Full-screen video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={heroVideoUrl || "/n.mp4"} type="video/mp4" />
          </video>
          {/* Minimal bottom fade only — keeps text readable without killing the video */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
            }}
          />
        </div>

        {/* Content — positioned at the bottom of the video */}
        <motion.div
          initial="hidden"
          animate={isBooting ? "hidden" : "visible"}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="relative z-10 w-full max-w-5xl space-y-6"
        >
          {/* Badge + motto */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-widest text-[#FF1E27] font-bold shrink-0 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              YOUTOBIA P.L.C. MULTIMEDIA CONGLOMERATE
            </div>
            <div className="h-5 overflow-hidden relative min-w-[240px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMottoIndex}
                  initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 text-[10px] font-mono tracking-widest text-white/45 font-semibold uppercase"
                >
                  // {mottos[currentMottoIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="space-y-3 max-w-2xl"
          >
            <p className="font-serif italic text-xl sm:text-2xl text-white/90 leading-snug tracking-tight">
              Uniting five specialized disciplines under a master system of craft, technology, sound, storytelling, and culture.
            </p>
            <p className="text-white/55 text-sm leading-relaxed font-light">
              Based in Addis Ababa — YouTobia Multimedia drives a native holding architecture serving entertainment, streaming, education, and gamified engagement networks.
            </p>
          </motion.div>

          {/* Brand chips */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 font-mono text-[9px] text-[#FF1E27] tracking-widest uppercase font-bold">
              <Activity className="w-3 h-3" />
              Sub-Brand Ecosystem // Hover to Inspect
            </div>
            <div className="flex flex-wrap gap-2">
              {subBrandsArray.map((brand) => {
                const Icon = brand.icon;
                const isActive = hoveredBrandId === brand.id;
                return (
                  <motion.div
                    key={brand.id}
                    onMouseEnter={() => setHoveredBrandId(brand.id)}
                    onMouseLeave={() => setHoveredBrandId(null)}
                    animate={{ y: isActive ? -3 : 0, borderColor: isActive ? "rgba(255,30,39,0.6)" : "rgba(255,255,255,0.15)", backgroundColor: isActive ? "rgba(255,30,39,0.15)" : "rgba(255,255,255,0.08)" }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm cursor-pointer transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: isActive ? brand.color : "rgba(255,255,255,0.5)" }} />
                    <span className="text-xs font-medium text-white/80">{brand.name}</span>
                    <span className="text-[8px] font-mono text-white/35 uppercase tracking-wider hidden sm:inline">{brand.tag.split(" ")[0]}</span>
                  </motion.div>
                );
              })}
            </div>
            {/* Hover description */}
            <div className="h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                {hoveredBrandId ? (
                  <motion.p key={hoveredBrandId} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }} className="text-[11px] text-white/55 font-mono flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#FF1E27] rounded-full inline-block shrink-0" />
                    {subBrandsArray.find(b => b.id === hoveredBrandId)?.desc}
                  </motion.p>
                ) : (
                  <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[10px] text-white/30 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#FF1E27]" />
                    Hover a brand to preview
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTAs + footer */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => onNavigate("brand-ecosystem")}
              className="group px-6 py-3.5 bg-[#FF1E27] hover:bg-[#e0181f] text-white font-bold text-xs tracking-widest flex items-center gap-2 transition-colors cursor-pointer active:scale-95 rounded-lg shadow-lg shadow-black/30"
            >
              EXPLORE BRAND ECOSYSTEM
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onPlayDemo}
              className="group px-6 py-3.5 bg-white/10 hover:bg-white/18 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white font-mono text-[11px] tracking-widest flex items-center gap-2 transition-colors cursor-pointer rounded-lg"
            >
              PLAY TRIVIA GAME
              <ArrowUpRight className="w-4 h-4 text-[#FF1E27] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <div className="ml-auto flex items-center gap-3 font-mono text-[10px] text-white/35">
              <span className="flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#FF1E27] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF1E27]" />
              </span>
              <span className="uppercase tracking-widest hidden sm:inline">YOUTOBIA NETWORKS // LIVE</span>
              <button onClick={() => onNavigate("studio")} className="flex items-center gap-1 hover:text-[#FF1E27] cursor-pointer font-bold tracking-widest text-[#FF1E27]/60 transition-colors group">
                OUR TEAM
                <ArrowDown className="w-3 h-3 animate-bounce" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default HugeHero;
