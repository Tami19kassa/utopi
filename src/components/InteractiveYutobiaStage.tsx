import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Crosshair, Grid, Globe, RefreshCw, Sliders, Sparkles, Cpu, Target, Maximize2, Layers } from "lucide-react";

type ViewportMode = "FREEFORM" | "ISOMETRIC";

const MANTRAS = [
  "Form demands absolute focus.",
  "Merge rich cultural myths with web interactions.",
  "Digital architecture built for immersive discovery.",
  "Rigor in execution, absolute design clarity.",
  "Harnessing distributed speed with local fidelity.",
  "Crafting high-contrast tactile ecosystems."
];

export const InteractiveYutobiaStage: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>("FREEFORM");
  const [clickCount, setClickCount] = useState(0);
  const [currentMantra, setCurrentMantra] = useState(MANTRAS[0]);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hudTab, setHudTab] = useState<"LAYERS" | "ANGLE" | "STATUS">("LAYERS");

  // Real-time calculated diagnostics
  const [diagnostics, setDiagnostics] = useState({
    fps: 60,
    signalCoherence: 99.9,
    matrixAngle: 45,
    lastTransmission: "SEC_OK_v4.5"
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stageRef.current) return;
      
      const rect = stageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2); // Normalized -1 to 1
      const y = (e.clientY - centerY) / (rect.height / 2); // Normalized -1 to 1

      if (viewportMode === "FREEFORM") {
        setTilt({
          x: -y * 22, // Enhanced tilting depth
          y: x * 22,
        });
        setDiagnostics(prev => ({
          ...prev,
          fps: Math.round(60 - Math.abs(x) * 3),
          matrixAngle: Math.round(45 + x * 30)
        }));
      } else {
        // Isometric fixed mode
        setTilt({ x: 35, y: -35 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewportMode]);

  const handleStageClick = () => {
    setClickCount(prev => prev + 1);
    
    // Cycle slogan mantra
    const nextIdx = (MANTRAS.indexOf(currentMantra) + 1) % MANTRAS.length;
    setCurrentMantra(MANTRAS[nextIdx]);

    // Fast-spin animation additive shift
    setRotationOffset(prev => prev + 120);

    // Dynamic signal spike
    setDiagnostics(prev => ({
      ...prev,
      signalCoherence: Math.min(100, +(98.8 + Math.random() * 1.2).toFixed(1))
    }));
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => (prev === 1 ? 1.15 : 1));
  };

  return (
    <div
      ref={stageRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (viewportMode === "FREEFORM") {
          setTilt({ x: 0, y: 0 });
        }
      }}
      className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden bg-neutral-900/[0.02] dark:bg-[#070707]/60 border border-neutral-100 dark:border-white/[0.05] flex items-center justify-center p-6 backdrop-blur-md transition-all duration-500 scale-100 hover:shadow-[0_20px_60px_rgba(255,30,39,0.05)] group"
      id="yutobia-interactive-stage"
    >
      {/* 1. SEAMLESS MATRIX GRID BACKPROP */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-[0.25] dark:opacity-[0.35]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="luxDots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.2" fill="currentColor" className="text-neutral-200 dark:text-neutral-800" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxDots)" />
        </svg>
      </div>

      {/* Radiant ambient red lens flares - pure depth lights */}
      <div className="absolute w-[290px] h-[290px] bg-[#FF1E27]/[0.05] dark:bg-[#FF1E27]/[0.13] rounded-full filter blur-[90px] pointer-events-none z-0 transition-transform duration-700 group-hover:scale-130" />

      {/* 2. PERSPECTIVE CAMERA CONTROL AND LENS TOOLBAR */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 bg-white/85 dark:bg-[#0f0f0f]/95 border border-neutral-200/55 dark:border-white/[0.06] rounded-xl shadow-lg backdrop-blur-md">
        {(["FREEFORM", "ISOMETRIC"] as ViewportMode[]).map(mode => (
          <button
            key={mode}
            onClick={(e) => {
              e.stopPropagation();
              setViewportMode(mode);
              if (mode === "ISOMETRIC") {
                setTilt({ x: 35, y: -35 });
              } else {
                setTilt({ x: 0, y: 0 });
              }
            }}
            className={`px-3 py-1.5 text-[9px] font-mono tracking-wider font-extrabold rounded-lg transition-all cursor-pointer ${
              viewportMode === mode
                ? "bg-[#FF1E27] text-white shadow-md shadow-red-950/10"
                : "text-neutral-500 dark:text-neutral-450 hover:text-neutral-800 dark:hover:text-white"
            }`}
          >
            {mode}
          </button>
        ))}

        <div className="w-[1px] h-4 bg-neutral-200 dark:bg-white/10 mx-1" />

        {/* Magnification Zoom Controller */}
        <button
          onClick={toggleZoom}
          className="p-1 px-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-[#FF1E27] transition-all cursor-pointer"
          title="Toggle Target Focus Range"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. FLOATING DESIGN CREED HEADER */}
      <div className="absolute top-4 right-4 z-20 max-w-[210px] text-right pointer-events-none">
        <div className="text-[8px] font-mono tracking-widest text-[#FF1E27] uppercase font-black mb-1">
          CREATIVE DIRECTIVE // LIVE
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMantra}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="text-[10.5px] text-neutral-500 dark:text-neutral-300 font-sans italic tracking-tight leading-snug"
          >
            “{currentMantra}”
          </motion.p>
        </AnimatePresence>
      </div>

      {/* 4. CONCENTRIC HUD ORBIT PATHS (Geometric & Minimalist) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[330px] h-[330px] rounded-full border border-neutral-100 dark:border-white/[0.03] relative flex items-center justify-center animate-[spin_60s_linear_infinite]">
          {/* Coordinate Marks */}
          <div className="absolute top-0 w-1.5 h-1.5 bg-[#FF1E27]/50 rounded-full" />
          <div className="absolute bottom-0 w-1.5 h-1.5 bg-[#FF1E27]/50 rounded-full" />
          <div className="absolute left-0 w-1.5 h-1.5 bg-neutral-300 dark:bg-white/20 rounded-full" />
          <div className="absolute right-0 w-1.5 h-1.5 bg-neutral-300 dark:bg-white/20 rounded-full" />
        </div>

        {/* Diagonal Crosshair Scopes */}
        <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-neutral-200/50 dark:border-white/[0.04] animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[180px] h-[180px] rounded-full border border-neutral-200/40 dark:border-white/[0.02]" />
      </div>

      {/* 5. PARALLAX CORE CANVAS FIELD */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          z: isHovered ? 25 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center w-[300px] h-[300px] z-10 cursor-pointer select-none"
        onClick={handleStageClick}
      >
        
        {/* Futuristic Floating Digital Dust particles around the logo sphere */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1, y: 40 }}
              animate={{
                opacity: [0.15, 0.7, 0.15],
                y: [-30, -110, -170],
                x: [Math.sin(i) * 60, Math.cos(i) * 90 + (i % 2 === 0 ? 30 : -30)],
                scale: [0.5, 1.2, 0.4],
              }}
              transition={{
                duration: 5 + i * 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-1 rounded-full bg-[#FF1E27]/50 dark:bg-red-400"
              style={{
                left: `calc(50% + ${Math.sin(i) * 40}px - 2px)`,
                top: "65%",
                height: i % 2 === 0 ? "4px" : "1px" // subtle modern lines or particles
              }}
            />
          ))}
        </div>

        {/* Outer glowing orbital trajectory ring with dynamic rotation offset */}
        <motion.div
          animate={{
            rotate: 360 + rotationOffset,
            scale: zoomLevel
          }}
          transition={{
            rotate: { duration: 25, ease: "linear", repeat: Infinity },
            scale: { type: "spring", stiffness: 200, damping: 14 }
          }}
          className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-[#FF1E27]/30 dark:border-[#FF1E27]/20 flex items-center justify-center"
        >
          {/* Tracking cursor points */}
          <div className="absolute top-0 right-0 w-2 h-2 border border-[#FF1E27] bg-[#FF1E27]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border border-[#FF1E27] bg-[#FF1E27]" />
        </motion.div>

        {/* 6. IMMERSIVE GLOWING INTERACTIVE LOGO GALAXY */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            scale: zoomLevel,
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 200, damping: 14 }
          }}
          className="relative z-30 transition-shadow duration-300"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Ultra detailed glowing circular YouTobia emblem */}
          <svg
            width="170"
            height="170"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_15px_35px_rgba(255,30,39,0.35)] dark:drop-shadow-[0_25px_50px_rgba(255,30,39,0.6)] transition-all duration-300 hover:scale-[1.04]"
          >
            <defs>
              <linearGradient id="glowRedCore" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFA0A4" />
                <stop offset="50%" stopColor="#FF1E27" />
                <stop offset="100%" stopColor="#7E0308" />
              </linearGradient>
              <linearGradient id="glowRibbonBeta" x1="40" y1="20" x2="80" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#FFE0E2" />
                <stop offset="100%" stopColor="#FF1E27" />
              </linearGradient>
              <filter id="hologramGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="9" stdDeviation="7" floodColor="#FF1E27" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Geometry Grid Circles for structural engineering look */}
            <circle cx="60" cy="60" r="54" stroke="rgba(255,30,39,0.22)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="60" cy="60" r="44" stroke="rgba(255,30,39,0.12)" strokeWidth="0.8" strokeDasharray="1 3" />

            {/* Glowing Logo Outer Globe Crest Base */}
            <path
              d="M 60,11 C 30,11 11,32 11,60 C 11,88 28,103 48,107 C 49,90 41,79 34,71 C 26,62 19,53 23,40 C 27,27 39,21 54,23 C 71,25 80,39 82,53 C 84,67 76,80 66,86 C 65,86 52,90 40,84 C 55,94 77,93 89,81 C 102,68 104,45 94,30 C 86,18 73,11 60,11 Z"
              fill="url(#glowRedCore)"
              filter="url(#hologramGlow)"
            />

            {/* Glowing 3D Ribbon Wrap representing the 'Y' core */}
            <path
              d="M 42,32 C 40,45 42,55 48,65 C 55,75 66,78 78,74 C 92,70 102,54 96,38 C 94,33 88,40 85,45 C 77,58 64,62 55,54 C 49,49 48,38 46,30 C 45,26 43,26 42,32 Z"
              fill="url(#glowRibbonBeta)"
            />

            {/* Central White Energy Node */}
            <circle cx="60" cy="60" r="5.5" fill="#FFFFFF" className="animate-pulse" />

            {/* Bottom Swoop Stand */}
            <path
              d="M 48,107 C 42,108 34,103 28,100 C 24,96 16,78 18,65 C 19,64 21,68 22,72 C 26,88 36,98 48,103 C 49,105 49,106 48,107 Z"
              fill="#FFA0A4"
            />
          </svg>

          {/* Central concentric energy flashboard pulse triggered by clicking */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full flex items-center justify-center">
            <span
              key={clickCount}
              className={`w-[140px] h-[140px] rounded-full border border-[#FF1E27]/50 block absolute transition-all duration-[1000ms] ease-out opacity-0 ${
                clickCount > 0 ? "animate-ping" : ""
              }`}
            />
          </div>
        </motion.div>

        {/* Laser target alignment guides (Strictly visual high-end architecture) */}
        <div className="absolute scale-90 top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neutral-300 dark:border-white/10 pointer-events-none" />
        <div className="absolute scale-90 top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neutral-300 dark:border-white/10 pointer-events-none" />
        <div className="absolute scale-90 bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neutral-300 dark:border-white/10 pointer-events-none" />
        <div className="absolute scale-90 bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neutral-300 dark:border-white/10 pointer-events-none" />

      </motion.div>

      {/* 7. REDESIGNED GRID SYSTEM CONTROLLER PANEL */}
      <div className="absolute bottom-12 left-6 right-6 z-20 flex justify-between items-center bg-white/80 dark:bg-[#0c0c0c]/90 border border-neutral-200/50 dark:border-white/[0.05] py-2 px-3.5 rounded-2xl shadow-md backdrop-blur-md">
        <div className="flex gap-3">
          {(["LAYERS", "ANGLE", "STATUS"] as const).map(tab => (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation();
                setHudTab(tab);
              }}
              className={`text-[8.5px] font-mono font-black tracking-widest cursor-pointer transition-colors ${
                hudTab === tab
                  ? "text-[#FF1E27]"
                  : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-350"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-[8.5px] font-mono tracking-wider font-bold text-neutral-600 dark:text-neutral-300">
          {hudTab === "LAYERS" && `EMBLEM CORE v2.0 // BRAND SCALING`}
          {hudTab === "ANGLE" && `ROTATION_X: ${tilt.x.toFixed(0)}° // ROTATION_Y: ${tilt.y.toFixed(0)}°`}
          {hudTab === "STATUS" && `COHERENCE: ${diagnostics.signalCoherence}% // ACTIVE LOOP`}
        </div>
      </div>

      {/* 8. FINE STUDIO ACCREDITATIONS BAR */}
      <div className="absolute bottom-4 inset-x-6 flex justify-between items-center text-[8px] font-mono tracking-widest text-[#FF1E27]/60 dark:text-neutral-500 z-10 pointer-events-none select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-ping" />
          <span>INTERACTIVE DESIGN DEMO // READY</span>
        </div>
        <div className="hidden sm:block">
          <span>STUDIO VERSION // 2026.06</span>
        </div>
        <div>
          <span>YOUTOBIA_STUDIOS</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveYutobiaStage;
