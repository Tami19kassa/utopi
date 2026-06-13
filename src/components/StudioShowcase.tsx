import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StaggeredLetters } from "./StaggeredLetterReveal";
import { ArrowUpRight, Check, Compass, Monitor, Volume2, Shield, Heart } from "lucide-react";

interface StudioShowcaseProps {
  onPlayDemo: () => void;
}

export const StudioShowcase: React.FC<StudioShowcaseProps> = ({ onPlayDemo }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const capabilities = [
    {
      id: 1,
      tag: "DIGITAL GAMIFICATION",
      title: "እንቆቅCASH TRIVIA PLATFORM",
      desc: "Our flagship regulated Amharic trivia network designed to connect and reward intellect with secure verification and responsive timers.",
      image: "/src/assets/images/game_interface_1781111602583.png",
      span: "md:col-span-8",
      action: onPlayDemo,
      btnText: "Launch Mini-Game",
    },
    {
      id: 2,
      tag: "STREAMING ENGINE",
      title: "ቀናVIEW DISTRIBUTOR",
      desc: "A premium, technologically advanced cloud-streaming platform designed to revolutionize how people access immersive entertainment.",
      image: "/src/assets/images/modern_studio_1781111587439.png",
      span: "md:col-span-4",
    },
    {
      id: 3,
      tag: "CULTURAL STORYTELLING",
      title: "eTOP PRODUCTION HOUSE",
      desc: "Leading multimedia content creator fostering highly original creative ecosystems where artists push the absolute boundaries of film.",
      image: "https://picsum.photos/seed/geez/800/800",
      span: "md:col-span-4",
    },
    {
      id: 4,
      tag: "CREATOR EMPOWERMENT",
      title: "የንታBARSIISAA ACADEMY",
      desc: "An educational pioneer equipping visual and design builders with standard skills in cinematography, sound, and digital arts.",
      image: "https://picsum.photos/seed/sonic/1200/800",
      span: "md:col-span-8",
    },
  ];

  const featuresList = [
    {
      title: "Brand Systems & Strategy",
      desc: "Logo engineering, design guidelines, corporate values direction, and market research.",
      icon: Compass,
      topic: "STRATEGY VECTOR",
    },
    {
      title: "Interactive Web Engineering",
      desc: "Custom React modules, highly-responsive state triggers, elegant game mechanics, and digital visibility.",
      icon: Monitor,
      topic: "DIGITAL CORE",
    },
    {
      title: "Cultural Content Synthesis",
      desc: "Blending traditional Amharic narratives, general knowledge trivia, and Ge'ez patterns with global aesthetics.",
      icon: Shield,
      topic: "SYNTHESIS LAB",
    },
    {
      title: "Multimedia Production",
      desc: "Full-scale cinematic compositions, sonic synthesis, motion graphic streams, and immersive media.",
      icon: Volume2,
      topic: "CREATIVE PRODUCTION",
    },
  ];

  return (
    <section id="studio" className="relative py-24 md:py-32 bg-gradient-to-b from-[#FCFAF6] via-[#F6F4EB] to-[#FAF8F3] dark:from-[#060606] dark:via-[#090909] dark:to-[#060606] border-t border-neutral-200/40 dark:border-white/5 px-6 md:px-12 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Typographic Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-neutral-200/40 dark:border-white/10 pb-12">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-semibold">
              03 / CAPABILITIES & WORK
            </span>
            <h2 className="font-serif italic text-4xl sm:text-6xl text-neutral-900 tracking-tight leading-none">
              <StaggeredLetters text="Our Playground" /> <br />
              <span className="text-[#FF1E27] font-display font-black tracking-tighter uppercase not-italic">
                <StaggeredLetters text="of Creation" delay={0.25} />
              </span>.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-neutral-600 text-base md:text-lg font-sans max-w-xl leading-relaxed font-light">
              At YouTobia Multimedia, we don't just supply services; we build fully-aligned digital landscapes. 
              Our work merges rich artistic craftsmanship with dynamic, performant frameworks to captivate global audiences.
            </p>
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {capabilities.map((card, i) => (
            <motion.div
              key={card.id}
              className={`relative overflow-hidden group rounded-2xl border border-neutral-200/80 bg-white flex flex-col justify-end min-h-[460px] cursor-pointer shadow-xs ${card.span}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.97 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  transition: { type: "spring", stiffness: 80, damping: 13 } 
                }
              }}
            >
              {/* Card Image with zoom logic */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img
                  src={card.image}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700 ease-out transform group-hover:scale-[1.05]"
                />
              </div>

              {/* Card Content Overlay with custom kinetic hover lift */}
              <motion.div 
                className="relative z-20 p-6 md:p-8 space-y-4"
                animate={{ y: hoveredCard === i ? -8 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#FF1E27] font-bold bg-[#FF1E27]/10 border border-[#FF1E27]/20 rounded px-2.5 py-1">
                    {card.tag}
                  </span>
                  
                  {/* Creative Score Indicator */}
                  <div className="overflow-hidden h-3 relative opacity-0 group-hover:opacity-60 transition-all duration-300">
                    <span className="text-[8px] font-mono text-white tracking-[0.2em] block uppercase">
                      CREATIVE FOCUS // {100 - (i * 4)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif italic text-3xl text-white tracking-tight leading-tight group-hover:text-red-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl font-sans font-light">
                    {card.desc}
                  </p>
                </div>

                {/* Optional trigger action inside bento block */}
                {card.action && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      card.action();
                    }}
                    className="mt-2 inline-flex items-center gap-2 bg-[#FF1E27] hover:bg-[#C90E16] text-white text-xs font-mono tracking-widest px-4 py-2 rounded-lg transition-colors group-hover:scale-105 transform cursor-pointer font-bold"
                  >
                    <span>{card.btnText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand pillars section: Clean grid blocks */}
        <div className="pt-16 border-t border-neutral-200/40 dark:border-white/10 space-y-12">
          <div className="max-w-md">
            <span className="font-mono text-xs tracking-widest text-brand font-semibold">
              OUR DEVELOPMENT FRAMEWORK
            </span>
            <h3 className="font-serif italic text-3xl text-neutral-900 dark:text-neutral-100 tracking-tight pt-1">
              The YouTobia Principles
            </h3>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuresList.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.98 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1, 
                      transition: { type: "spring", stiffness: 100, damping: 15 } 
                    }
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0 30px 60px -15px rgba(255, 30, 39, 0.08), 0 4px 12px -2px rgba(18, 18, 16, 0.03)"
                  }}
                  className="relative overflow-hidden p-6 md:p-8 rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white dark:bg-[#0C0C0C] hover:border-[#FF1E27]/30 dark:hover:border-[#FF1E27]/40 transition-all duration-500 space-y-6 group cursor-pointer"
                >
                  {/* Subtle red line top highlight that expands on hover */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-neutral-200/50 dark:bg-neutral-800 group-hover:bg-[#FF1E27] transition-colors duration-300" />
                  
                  {/* Watermark index */}
                  <div className="absolute right-4 bottom-2 text-7xl font-sans font-black select-none pointer-events-none opacity-[0.02] dark:opacity-[0.04] group-hover:opacity-[0.07] dark:group-hover:opacity-[0.11] transition-opacity duration-300 italic group-hover:-translate-y-1 transform transition-transform duration-500 font-display">
                    0{i + 1}
                  </div>

                  {/* Top bar with morphing icon and metadata indicator */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#FF1E27]/[0.03] dark:bg-[#FF1E27]/10 flex items-center justify-center text-[#FF1E27] transition-all duration-300 group-hover:bg-[#FF1E27] group-hover:text-white group-hover:scale-110 shadow-sm border border-[#FF1E27]/10">
                      <Icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
                    </div>
                    <span className="font-mono text-[9px] tracking-widest text-[#FF1E27] dark:text-red-400 font-bold bg-[#FF1E27]/[0.04] dark:bg-[#FF1E27]/15 px-2.5 py-1 rounded-sm border border-[#FF1E27]/10">
                      // DIRECTIVE: 0{i + 1}
                    </span>
                  </div>

                  {/* Title & Topic Meta */}
                  <div className="space-y-2 relative z-10">
                    <span className="text-[8px] font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase block">
                      {f.topic}
                    </span>
                    <h4 className="font-serif italic text-lg md:text-xl text-neutral-900 dark:text-neutral-100 group-hover:text-[#FF1E27] transition-colors font-semibold leading-snug tracking-tight">
                      {f.title}
                    </h4>
                  </div>

                  {/* Separation line */}
                  <div className="w-full h-[1px] bg-neutral-200/50 dark:bg-neutral-800/30 border-dashed border-t" />

                  {/* Description */}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light relative z-10">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default StudioShowcase;
