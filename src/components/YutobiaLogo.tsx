import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number; // scale factor
  showText?: boolean;
}

export const YutobiaLogo: React.FC<LogoProps> = ({
  className = "",
  size = 40,
  showText = true,
}) => {
  // Pull real-time global viewport scrolling progress to drive momentum effects
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Interpolate physical spring momentum
  const smoothVelocity = useSpring(scrollVelocity, { 
    stiffness: 85, 
    damping: 22 
  });

  // Calculate high-performance 3D transforms based on momentum:
  // 1. Barrel roll (X-axis rotation) reacting symmetrically to upward/downward movement
  const logoRotateX = useTransform(smoothVelocity, [-4000, 0, 4000], [-360, 0, 360]);
  
  // 2. Depth recession (Scale down & 3D translate-Z depth pushing backwards during active scroll waves)
  const logoScale = useTransform(smoothVelocity, [-4500, 0, 4500], [0.82, 1, 0.82]);
  const logoZ = useTransform(smoothVelocity, [-4500, 0, 4500], [-55, 0, -55]);

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Emblem with high-end SVG path work wrapped in a momentum-responsive 3D container */}
      <div style={{ perspective: "400px", transformStyle: "preserve-3d" }}>
        <motion.svg
          id="yutobia-logo-sphere"
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            rotateX: logoRotateX,
            scale: logoScale,
            z: logoZ,
            transformStyle: "preserve-3d"
          }}
          className="shrink-0 transition-shadow duration-300 drop-shadow-[0_2px_8px_rgba(255,30,39,0.12)] hover:drop-shadow-[0_4px_16px_rgba(255,30,39,0.3)]"
        >
          <defs>
            <linearGradient id="logoRedGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5C62" />
              <stop offset="50%" stopColor="#FF1E27" />
              <stop offset="100%" stopColor="#A30B11" />
            </linearGradient>
            <linearGradient id="ribbonGrad" x1="40" y1="20" x2="80" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFA1A5" />
              <stop offset="100%" stopColor="#FF1E27" />
            </linearGradient>
            <filter id="logoShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#FF1E27" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Outer Circular Flow / Globe Crest */}
          <path
            d="M 60,11 C 30,11 11,32 11,60 C 11,88 28,103 48,107 C 49,90 41,79 34,71 C 26,62 19,53 23,40 C 27,27 39,21 54,23 C 71,25 80,39 82,53 C 84,67 76,80 66,86 C 65,86 52,90 40,84 C 55,94 77,93 89,81 C 102,68 104,45 94,30 C 86,18 73,11 60,11 Z"
            fill="url(#logoRedGrad)"
            filter="url(#logoShadow)"
          />

          {/* 3D Ribbon Wrap representing the 'Y' core */}
          <path
            d="M 42,32 C 40,45 42,55 48,65 C 55,75 66,78 78,74 C 92,70 102,54 96,38 C 94,33 88,40 85,45 C 77,58 64,62 55,54 C 49,49 48,38 46,30 C 45,26 43,26 42,32 Z"
            fill="url(#ribbonGrad)"
          />

          {/* Red Base Stand Sweep */}
          <path
            d="M 48,107 C 42,108 34,103 28,100 C 24,96 16,78 18,65 C 19,64 21,68 22,72 C 26,88 36,98 48,103 C 49,105 49,106 48,107 Z"
            fill="#FF5C62"
          />
        </motion.svg>
      </div>

      {/* Branded Typographic representation mapping 'O' to the geometric custom sphere */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center tracking-tight leading-none text-[#FF1E27] font-display font-black text-2xl">
            <span>Y</span>
            <svg
              width="21"
              height="21"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mx-0.5 self-center"
            >
              <path
                d="M 60,11 C 30,11 11,32 11,60 C 11,88 28,103 48,107 C 49,90 41,79 34,71 C 26,62 19,53 23,40 C 27,27 39,21 54,23 C 71,25 80,39 82,53 C 84,67 76,80 66,86 C 65,86 52,90 40,84 C 55,94 77,93 89,81 C 102,68 104,45 94,30 C 86,18 73,11 60,11 Z"
                fill="#FF1E27"
              />
              <path
                d="M 42,32 C 40,45 42,55 48,65 C 55,75 66,78 78,74 C 92,70 102,54 96,38 C 94,33 88,40 85,45 C 77,58 64,62 55,54 C 49,49 48,38 46,30 C 45,26 43,26 42,32 Z"
                fill="#FFFFFF"
              />
            </svg>
            <span>UTOBIA</span>
          </div>
          <span className="text-[9px] tracking-[0.28em] text-neutral-500 dark:text-white/60 font-mono font-semibold">
            MULTIMEDIA
          </span>
        </div>
      )}
    </div>
  );
};

export default YutobiaLogo;
