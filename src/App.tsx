import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import HugeHeader from "./components/HugeHeader";
import HugeHero from "./components/HugeHero";
import StoryScrollJourney from "./components/StoryScrollJourney";
import BrandEcosystem from "./components/BrandEcosystem";
import EnqoqCashDemo from "./components/EnqoqCashDemo";
import StudioShowcase from "./components/StudioShowcase";
import MediaHub from "./components/MediaHub";
import HugeFooter from "./components/HugeFooter";
import CookieBanner from "./components/CookieBanner";
import { fetchMediaItems, addLikeToItem, fetchSocialAccounts, fetchHeroVideoUrl } from "./lib/supabase";
import { MediaItem, SocialAccount } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [gameScore, setGameScore] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState("INITIALIZING SYSTEM...");

  // Background scroll effect calculations with multi-step page-to-page transition positions
  const { scrollYProgress } = useScroll();
  const bgRotate = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], [0, 60, -90, 180, -30, 120, 310]);
  const bgScale = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], [1.0, 0.7, 1.35, 0.65, 1.15, 0.8, 0.55]);
  const bgX = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], ["0%", "-33%", "33%", "0%", "-30%", "25%", "35%"]);
  const bgY = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], ["0px", "-80px", "100px", "-220px", "80px", "120px", "260px"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], [0.10, 0.15, 0.08, 0.14, 0.09, 0.16, 0.06]);
  
  // 3D rotation tilts and Z-depth movements for a deep structural spatial parallax
  const bgRotateX = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], [15, -15, 20, -10, 25, -20, 10]);
  const bgRotateY = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], [-15, 20, -25, 15, -10, 25, -15]);
  const bgZ = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], [-100, 50, -180, 80, -120, 150, -50]);
  const bgInnerRotate = useTransform(scrollYProgress, [0, 0.15, 0.32, 0.52, 0.72, 0.87, 1.0], [0, -45, 60, -95, 30, -60, -150]);
  
  // Spring configurations for dynamic premium physical motion interpolation
  const smoothRotate = useSpring(bgRotate, { stiffness: 60, damping: 26 });
  const smoothScale = useSpring(bgScale, { stiffness: 60, damping: 26 });
  const smoothX = useSpring(bgX, { stiffness: 60, damping: 26 });
  const smoothY = useSpring(bgY, { stiffness: 60, damping: 26 });
  const smoothOpacity = useSpring(bgOpacity, { stiffness: 60, damping: 26 });
  
  const smoothRotateX = useSpring(bgRotateX, { stiffness: 60, damping: 26 });
  const smoothRotateY = useSpring(bgRotateY, { stiffness: 60, damping: 26 });
  const smoothZ = useSpring(bgZ, { stiffness: 60, damping: 26 });
  const smoothInnerRotate = useSpring(bgInnerRotate, { stiffness: 35, damping: 20 });

  // Top viewport thin horizontal dynamic scroll progress bar
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  const scrollBarColor = useTransform(
    scrollYProgress,
    [0, 0.15, 1],
    ["#525252", "#b91c1c", "#FF1E27"]
  );
  
  // Theme Toggle Engine
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("Storage item setting failed:", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Control Panel integration state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [socials, setSocials] = useState<SocialAccount[]>([]);
  const [heroVideoUrl, setHeroVideoUrl] = useState("");

  const refreshUiAll = async () => {
    try {
      const media = await fetchMediaItems();
      setMediaItems(media);

      const soc = await fetchSocialAccounts();
      setSocials(soc);

      const video = await fetchHeroVideoUrl();
      setHeroVideoUrl(video);
    } catch (e) {
      console.error("Failed to load live database configs in main UI container:", e);
    }
  };

  useEffect(() => {
    refreshUiAll();
  }, []);

  const handleLikeItem = async (id: string) => {
    const updatedLikes = await addLikeToItem(id);
    setMediaItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, likes: updatedLikes };
      }
      return item;
    }));
  };

  // Trigger high score lookups 
  useEffect(() => {
    // Check if user has already played and stored a high score in this session
    try {
      const stored = localStorage.getItem("enqoq_leaderboard");
      if (stored) {
        const scores = JSON.parse(stored);
        if (scores && scores.length > 0) {
          // If the user name is saved in state we can fetch it, or just show high-score seed
          const totalScores = scores.reduce((acc: number, item: any) => Math.max(acc, item.score), 0);
          setGameScore(totalScores);
        }
      }
    } catch (e) {
      console.error("Failed to load scores for menu context", e);
    }
    
    // Play detailed splash entry animation with ticking up percentage
    let startTimestamp: number | null = null;
    const countDuration = 2200; // Duration for counting up to 100
    let animationFrameId: number;
    
    function animate(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / countDuration, 1);
      const currentProgress = Math.floor(progressRatio * 100);
      setLoadingProgress(currentProgress);
      
      if (currentProgress < 20) {
        setLoadingPhase("INITIALIZING BRAND PORTAL...");
      } else if (currentProgress < 50) {
        setLoadingPhase("CALIBRATING TRIVIA ENGINE (የዕውቀት ማዕከል)...");
      } else if (currentProgress < 75) {
        setLoadingPhase("COMPILING INTERACTIVE GAMESPACES...");
      } else if (currentProgress < 95) {
        setLoadingPhase("POLISHING RENDER PIPELINES...");
      } else {
        setLoadingPhase("SYSTEMS READY. WELCOME TO YOUTOBIA.");
      }
      
      if (elapsed < countDuration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Hold at 100% stable state for a moment before dropping curtain
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 3000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(bootTimer);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Setup auto-updating IntersectionObserver to trace active navigation sections on-scroll
  useEffect(() => {
    if (isBooting) return;
    const sections = ["home", "journey", "brand-ecosystem", "enqoq-cash", "studio", "connect"];
    const activeObservers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.18, rootMargin: "-12% 0px -50% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      activeObservers.forEach((item) => {
        if (item) {
          item.observer.unobserve(item.el);
        }
      });
    };
  }, [isBooting]);

  const handleUpdateScore = (score: number) => {
    setGameScore((prev) => Math.max(prev, score));
  };

  return (
    <div className="relative min-h-screen bg-[#FCFAF6] text-neutral-900 dark:bg-[#060606] dark:text-neutral-100 overflow-x-hidden font-sans transition-colors duration-500">
      
      {/* High-Performance Top Viewport Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 sm:h-[3px] z-55 origin-left pointer-events-none"
        style={{
          scaleX: smoothScrollProgress,
          backgroundColor: scrollBarColor,
        }}
      />
      
      {/* Huge Agency Splash Curtain Animation Loader */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            key="splash-wrapper"
            className="fixed inset-0 z-50 pointer-events-auto"
            exit={{
              transition: { staggerChildren: 0.1 }
            }}
          >
            {/* Top curtain sliding upwards */}
            <motion.div
              className="absolute left-0 top-0 w-full h-[51vh] bg-neutral-950 border-b border-[#FF1E27]/10 pointer-events-auto"
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
            />
            
            {/* Bottom curtain sliding downwards */}
            <motion.div
              className="absolute left-0 bottom-0 w-full h-[51vh] bg-neutral-950 border-t border-[#FF1E27]/10 pointer-events-auto"
              initial={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
            />

            {/* Subtle light pulse background */}
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,30,39,0.06)_0%,transparent_70%)] pointer-events-none"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Glowing lines across the curtain to represent architectural scanning */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] w-full bg-[#FF1E27]/20 pointer-events-none z-10" />

            {/* Content Centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 sm:p-12 text-center pointer-events-none z-20">
              
              {/* Top Meta Ticker */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.6 }}
                className="w-full flex justify-between items-center max-w-7xl font-mono text-[10px] tracking-widest text-[#FF1E27] pointer-events-auto select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
                  <span>YUTOBIA SYSTEM CORE v4.5</span>
                </div>
                <div>
                  <span>LOC_CODE: ETH_ADDIS_ABABA</span>
                </div>
              </motion.div>

              {/* Central Premium Branding and Pulsing Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.93, filter: "blur(12px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center space-y-8 pointer-events-auto"
              >
                <div className="relative">
                  {/* Outer atmospheric neon pulse blur */}
                  <div className="absolute inset-0 bg-[#FF1E27] rounded-full blur-[45px] opacity-20 scale-110 animate-pulse" />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="relative z-10"
                  >
                    <svg
                      width="95"
                      height="95"
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="splashRedGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FF5C62" />
                          <stop offset="50%" stopColor="#FF1E27" />
                          <stop offset="100%" stopColor="#A30B11" />
                        </linearGradient>
                        <linearGradient id="splashRibbonGrad" x1="40" y1="20" x2="80" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="30%" stopColor="#FFA1A5" />
                          <stop offset="100%" stopColor="#FF1E27" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 60,11 C 30,11 11,32 11,60 C 11,88 28,103 48,107 C 49,90 41,79 34,71 C 26,62 19,53 23,40 C 27,27 39,21 54,23 C 71,25 80,39 82,53 C 84,67 76,80 66,86 C 65,86 52,90 40,84 C 55,94 77,93 89,81 C 102,68 104,45 94,30 C 86,18 73,11 60,11 Z"
                        fill="url(#splashRedGrad)"
                      />
                      <path
                        d="M 42,32 C 40,45 42,55 48,65 C 55,75 66,78 78,74 C 92,70 102,54 96,38 C 94,33 88,40 85,45 C 77,58 64,62 55,54 C 49,49 48,38 46,30 C 45,26 43,26 42,32 Z"
                        fill="url(#splashRibbonGrad)"
                      />
                      <path
                        d="M 48,107 C 42,108 34,103 28,100 C 24,96 16,78 18,65 C 19,64 21,68 22,72 C 26,88 36,98 48,103 C 49,105 49,106 48,107 Z"
                        fill="#FF5C62"
                      />
                    </svg>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center items-center overflow-hidden">
                    {"YouTobia".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ y: 80, opacity: 0, rotate: 12 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + index * 0.08,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="font-serif italic text-6xl sm:text-7xl text-white select-none leading-none inline-block origin-bottom"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.55em" }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="text-[10px] sm:text-xs font-mono text-white/50 select-none uppercase transition-all"
                  >
                    The Multimedia Standard
                  </motion.p>
                </div>
              </motion.div>

              {/* Bottom Tickers & Calibration Progress */}
              <div className="w-full max-w-xl space-y-6 pointer-events-auto">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-end font-mono text-[10px] select-none">
                    <motion.span 
                      key={loadingPhase}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white/45 tracking-wider font-light"
                    >
                      {loadingPhase}
                    </motion.span>
                    <span className="text-[#FF1E27] font-semibold text-sm tracking-tight font-mono">
                      {loadingProgress.toString().padStart(3, '0')}%
                    </span>
                  </div>

                  {/* Horizontal Glowing Tech progress trace bar */}
                  <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                    <motion.div 
                      className="absolute left-0 top-0 h-full bg-[#FF1E27]"
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ ease: "linear", duration: 0.1 }}
                      style={{
                        boxShadow: "0 0 10px #FF1E27, 0 0 4px #FF1E27"
                      }}
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-mono text-[8px] text-white/40 tracking-[0.25em] flex justify-center gap-6 select-none"
                >
                  <span>GRID // ACTIVE</span>
                  <span>ACCELERATOR // WEBGL_OK</span>
                  <span>CULTURE_VAULT // SYNCED</span>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col">
        {/* Scroll-tracked parallax background YouTobia logo watermark */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none" style={{ perspective: "1500px" }}>
          <motion.div
            style={{
              rotate: smoothRotate,
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              z: smoothZ,
              scale: smoothScale,
              x: smoothX,
              y: smoothY,
              opacity: smoothOpacity,
              transformStyle: "preserve-3d"
            }}
            className="w-[180vw] h-[180vw] max-w-[850px] max-h-[850px] relative flex items-center justify-center shrink-0 transition-colors pointer-events-none"
          >
            {/* Layer 1: Ambient Glowing Halo Field in deep 3D space */}
            <div 
              style={{ 
                transform: "translateZ(-140px)",
                background: "radial-gradient(circle, rgba(255,30,39,0.32) 0%, rgba(255,30,39,0) 65%)"
              }} 
              className="absolute inset-0 w-full h-full filter blur-[80px] rounded-full pointer-events-none opacity-40 animate-pulse"
            />

            {/* Layer 2: Main outer crest background circle slightly recessed inside */}
            <div
              style={{
                transform: "translateZ(-60px)",
                transformStyle: "preserve-3d"
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_50px_rgba(255,30,39,0.15)] animate-pulse"
              >
                <defs>
                  <linearGradient id="bgRedGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF5C62" />
                    <stop offset="50%" stopColor="#FF1E27" />
                    <stop offset="100%" stopColor="#A30B11" />
                  </linearGradient>
                </defs>
                <path
                  d="M 60,11 C 30,11 11,32 11,60 C 11,88 28,103 48,107 C 49,90 41,79 34,71 C 26,62 19,53 23,40 C 27,27 39,21 54,23 C 71,25 80,39 82,53 C 84,67 76,80 66,86 C 65,86 52,90 40,84 C 55,94 77,93 89,81 C 102,68 104,45 94,30 C 86,18 73,11 60,11 Z"
                  fill="url(#bgRedGrad)"
                />
              </svg>
            </div>

            {/* Layer 3: Central Stand Base Sweep */}
            <div
              style={{
                transform: "translateZ(10px)"
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 48,107 C 42,108 34,103 28,100 C 24,96 16,78 18,65 C 19,64 21,68 22,72 C 26,88 36,98 48,103 C 49,105 49,106 48,107 Z"
                  fill="#FF5C62"
                />
              </svg>
            </div>

            {/* Layer 4: Floating 3D Y-Ribbon Core forward in 3D perspective with unique counter-rotation */}
            <motion.div
              style={{
                transform: "translateZ(80px)",
                rotate: smoothInnerRotate,
                transformStyle: "preserve-3d"
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
              >
                <defs>
                  <linearGradient id="bgRibbonGrad" x1="40" y1="20" x2="80" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#FFA1A5" />
                    <stop offset="100%" stopColor="#FF1E27" />
                  </linearGradient>
                </defs>
                <path
                  d="M 42,32 C 40,45 42,55 48,65 C 55,75 66,78 78,74 C 92,70 102,54 96,38 C 94,33 88,40 85,45 C 77,58 64,62 55,54 C 49,49 48,38 46,30 C 45,26 43,26 42,32 Z"
                  fill="url(#bgRibbonGrad)"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Sticky Header */}
        <HugeHeader
          onNavigate={handleNavigate}
          activeSection={activeSection}
          gameScore={gameScore}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* NATURAL VERTICAL MULTI-SECTION FLOW */}
        <main className="w-full relative z-10 flex flex-col">
          <motion.section 
            id="home" 
            className="w-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: isBooting ? 0 : 1 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
          >
            <HugeHero
              onPlayDemo={() => handleNavigate("enqoq-cash")}
              onNavigate={handleNavigate}
              gameScore={gameScore}
              heroVideoUrl={heroVideoUrl}
              isBooting={isBooting}
            />
          </motion.section>

          <motion.section 
            id="journey" 
            className="w-full relative"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateX: 8, y: 50, scale: 0.97, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, transformPerspective: 1200 }}
            viewport={{ once: true, amount: 0.03, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <StoryScrollJourney onPlayDemo={() => handleNavigate("enqoq-cash")} />
          </motion.section>

          <motion.section 
            id="brand-ecosystem" 
            className="w-full relative"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateX: -8, y: 50, scale: 0.97, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, transformPerspective: 1200 }}
            viewport={{ once: true, amount: 0.03, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrandEcosystem onPlayDemo={() => handleNavigate("enqoq-cash")} />
          </motion.section>

          <motion.section 
            id="enqoq-cash" 
            className="w-full relative"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateX: 8, y: 50, scale: 0.97, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, transformPerspective: 1200 }}
            viewport={{ once: true, amount: 0.03, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <EnqoqCashDemo onUpdateScore={handleUpdateScore} />
          </motion.section>

          <motion.section 
            id="studio" 
            className="w-full relative"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateX: -8, y: 50, scale: 0.97, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, transformPerspective: 1200 }}
            viewport={{ once: true, amount: 0.03, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <StudioShowcase onPlayDemo={() => handleNavigate("enqoq-cash")} />
          </motion.section>



          <motion.section 
            id="connect" 
            className="w-full relative bg-neutral-950 text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <HugeFooter onNavigate={handleNavigate} socials={socials} />
          </motion.section>
        </main>

        {/* PERSISTENT CUSTOM COOKIE REGULATION */}
        <CookieBanner />
      </div>
    </div>
  );
}
