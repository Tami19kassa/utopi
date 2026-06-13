import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { StaggeredLetters } from "./StaggeredLetterReveal";
import { HelpCircle, ChevronRight, Activity, Cpu, Award, MessageCircle, Coins, ShieldCheck, Play, Tv, GraduationCap, BookOpen, Sparkles } from "lucide-react";

interface StoryStep {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  badge: string;
}

export const StoryScrollJourney: React.FC<{ onPlayDemo: () => void }> = ({ onPlayDemo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within this storytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform lines or graphics based on scroll
  const progressHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const pulseScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1.05, 0.95]);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0.1, 0.3, 0.1]);

  const steps: StoryStep[] = [
    {
      id: "step1",
      num: "01",
      title: "eTop & ቀናView Co-Engine",
      subtitle: "STORYTELLING & STREAMING INFRASTRUCTURE",
      desc: "Our production division, eTop, crafts bold, original, and sustainable content, while ቀናView serves as our advanced digital distribution network designed for high-resolution content playback globally.",
      icon: <Tv className="w-6 h-6 text-[#FF1E27]" />,
      badge: "CHAPTER I: CREATE & DISTRIBUTE"
    },
    {
      id: "step2",
      num: "02",
      title: "የንታBarsiisaa Training Core",
      subtitle: "MULTIMEDIA SKILLS & PROFESSIONAL EMPOWERMENT",
      desc: "An inclusive educational academy equipping both aspiring and seasoned creators with tools for media arts, visual engineering, and sound synthesis, guaranteeing career-defining lifelong learning.",
      icon: <GraduationCap className="w-6 h-6 text-[#FF1E27]" />,
      badge: "CHAPTER II: LEARN & EMPOWER"
    },
    {
      id: "step3",
      num: "03",
      title: "ምርXog Insight Service",
      subtitle: "ACCURATE INDUSTRY NEWS & TRANPARENT ANALYTICS",
      desc: "Our media news outlet is the go-to reference source for up-to-date multimedia trend tracking, analysis, and insights, delivering vetted information to businesses, creators, and enthusiasts.",
      icon: <BookOpen className="w-6 h-6 text-[#FF1E27]" />,
      badge: "CHAPTER III: DISCOVER & INFORM"
    },
    {
      id: "step4",
      num: "04",
      title: "እንቆቅCash Gamified Network",
      subtitle: "INTELLECT TRANSFORMS INTO UNIQUE REWARDS",
      desc: "Adapting 'Enqoqlsh' riddles into a cutting-edge web trivia engine. Players challenge their knowledge, answer against rapid clocks, and unlock structural prizes on a regulated rewards ledger.",
      icon: <Sparkles className="w-6 h-6 text-[#FF1E27]" />,
      badge: "CHAPTER IV: GAMIFY & CONNECT"
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="story-journey" 
      className="relative py-28 md:py-40 bg-gradient-to-b from-[#F2EFE7] via-[#FCFAF6] to-[#FAF8F3] dark:from-[#090909] dark:via-[#060606] dark:to-[#080808] border-t border-neutral-200/40 dark:border-white/5 px-6 md:px-12 overflow-hidden"
    >
      {/* Editorial Watermark & Grid Background */}
      <div className="absolute inset-0 huge-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute left-[2%] top-[25%] text-neutral-100/55 dark:text-neutral-900/50 font-display font-black text-[11rem] xl:text-[20rem] leading-none select-none pointer-events-none tracking-tighter uppercase">
        HOLDINGS
      </div>
      <div className="absolute right-[2%] bottom-[15%] text-[#FF1E27]/[0.01] font-display font-black text-[11rem] xl:text-[20rem] leading-none select-none pointer-events-none tracking-tighter">
        ECOSYSTEM
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Typographic Intro Statement - Animated text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-neutral-200 dark:border-white/10 pb-16 mb-24 transition-colors">
          <div className="lg:col-span-7 space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs tracking-widest text-[#FF1E27] font-bold flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-[#FF1E27] rounded-full animate-pulse" />
              02 / THE ECOSYSTEM ENGINES
            </motion.span>
            <h2 className="font-serif italic text-4xl sm:text-6xl text-neutral-900 dark:text-white tracking-tight leading-none transition-colors">
              <StaggeredLetters text="The Integrated" /> <br />
              <span className="text-[#FF1E27] font-display font-black tracking-tighter uppercase not-italic">
                <StaggeredLetters text="Holdings Journey" delay={0.25} />
              </span>.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-sans leading-relaxed font-light transition-colors"
            >
              We bring together storytelling, global streaming feeds, interactive online portals, professional multimedia academies, and vetted news channels into one holistic, powerful network.
            </motion.p>
          </div>
        </div>

        {/* Story Journey Grid (Timeline side-by-side with interactive visual state) */}
        <div className="relative">
          
          {/* Centered timeline progress bar on Desktop (hidden on mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-200 -translate-x-[0.5px] pointer-events-none hidden md:block">
            {/* Live animated active scrolling tracker trace */}
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF1E27] to-[#ffd1d3] origin-top"
              style={{ height: progressHeight }}
            />
          </div>

          <div className="space-y-24 md:space-y-40">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={step.id} 
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative ${isEven ? "" : "md:flex-row-reverse"}`}
                >
                  
                  {/* Step Info segment */}
                  <motion.div 
                    className={`md:col-span-5 space-y-6 ${isEven ? "md:order-1" : "md:order-3 md:text-right md:items-end flex flex-col"}`}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-bold">
                      {step.badge}
                    </span>
                    
                    <div className="flex items-center gap-4 group">
                      {isEven && (
                        <div className="w-12 h-12 rounded-xl bg-[#FF1E27]/10 flex items-center justify-center shrink-0 border border-[#FF1E27]/20">
                          {step.icon}
                        </div>
                      )}
                      <div>
                        <span className="font-mono text-[10px] text-neutral-400 block">SERIES {step.num}/04</span>
                        <h3 className="font-serif italic text-2xl sm:text-3xl text-neutral-900 tracking-tight group-hover:text-[#FF1E27] transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      {!isEven && (
                        <div className="w-12 h-12 rounded-xl bg-[#FF1E27]/5 flex items-center justify-center shrink-0 border border-[#FF1E27]/20">
                          {step.icon}
                        </div>
                      )}
                    </div>

                    <p className={`text-neutral-600 text-sm leading-relaxed font-sans font-light max-w-md ${!isEven ? "md:text-right" : ""}`}>
                      {step.desc}
                    </p>
                  </motion.div>

                  {/* Desktop Center Ticker Bead (Absolute timeline indicator block) */}
                  <div className="md:col-span-2 flex justify-start md:justify-center md:order-2 z-10">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center text-neutral-800 font-mono text-xs font-bold hover:border-[#FF1E27] transition-colors relative"
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {step.num}
                      <span className="absolute -inset-1 rounded-full border border-[#FF1E27]/30 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Interactive Dynamic Graphic Showcase representing each step in red and white with high-end 3D perspective */}
                  <motion.div 
                    className={`md:col-span-12 lg:col-span-5 ${isEven ? "md:order-3" : "md:order-1"}`}
                    initial={{ opacity: 0, scale: 0.92, y: 35, rotateX: 6, rotateY: isEven ? 12 : -12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
                    whileHover={{ scale: 1.025, rotateY: isEven ? 3 : -3, rotateX: -2 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                  >
                    <div className="bg-[#fafafa]/80 border border-neutral-200 rounded-2xl p-6 md:p-8 relative overflow-hidden aspect-video flex flex-col justify-between group hover:border-[#FF1E27]/30 transition-all duration-500 shadow-md">
                      
                      {/* Grid background on inside cards too */}
                      <div className="absolute inset-0 huge-grid-pattern opacity-10 pointer-events-none" />
                      <div className="absolute top-0 left-0 w-2 h-full bg-[#FF1E27] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                      {/* Header bar */}
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
                          <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
                            ECOSYSTEM: SECTOR_{step.num}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-[#FF1E27] tracking-widest">
                          [ YUTOBIA HOLDINGS ]
                        </span>
                      </div>

                      {/* CHAPTER 1 GRAPHIC: eTop & ቀናView Stream */}
                      {step.id === "step1" && (
                        <div className="my-auto flex flex-col justify-center space-y-3 w-full max-w-sm mx-auto">
                          <div className="font-mono text-[9px] text-neutral-450 uppercase tracking-widest flex justify-between">
                            <span>ቀናView STREAMING ACTIVE</span>
                            <span>1080P PRO</span>
                          </div>
                          <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 relative overflow-hidden aspect-video flex flex-col justify-between shadow-lg">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,30,39,0.15),transparent_70%)]" />
                            <div className="flex justify-between items-start z-10">
                              <span className="bg-red-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                                eTop Production
                              </span>
                              <span className="text-[9px] font-mono text-zinc-400">Live ዐይናዊ Feed</span>
                            </div>
                            <div className="z-10 text-center space-y-1">
                              <span className="text-white font-serif italic text-xs block">"Creative Storytelling Showcase"</span>
                              <span className="text-[9px] text-zinc-400 font-light">Sub-brand 02 & 03 synced</span>
                            </div>
                            <div className="h-1 w-full bg-zinc-700 rounded-full overflow-hidden z-10">
                              <div className="h-full w-2/3 bg-red-600 rounded-full" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 2 GRAPHIC: YentaBarsiisaa Training Course */}
                      {step.id === "step2" && (
                        <div className="my-auto flex flex-col justify-center space-y-2 w-full max-w-sm mx-auto">
                          <div className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#FF1E27]">
                            የንታBarsiisaa Syllabus Core
                          </div>
                          <div className="w-full bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-white/5 text-xs font-mono flex items-center justify-between">
                            <span className="text-neutral-700 dark:text-neutral-300">01. Visual Storytelling & VFX</span>
                            <span className="text-[9px] text-zinc-400 font-bold uppercase select-none">Course Active</span>
                          </div>
                          <div className="w-full bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-white/5 text-xs font-mono flex items-center justify-between">
                            <span className="text-neutral-700 dark:text-neutral-300">02. Sound Design & Synth Synthesis</span>
                            <span className="text-[9px] text-zinc-400 font-bold uppercase select-none">Course Active</span>
                          </div>
                          <div className="w-full bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-white/5 text-xs font-mono flex items-center justify-between">
                            <span className="text-neutral-700 dark:text-neutral-300">03. Interactive Frontend Crafts</span>
                            <span className="text-[9px] text-[#FF1E27] font-semibold uppercase animate-pulse">Enroll Open</span>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 3 GRAPHIC: MirXog news feed */}
                      {step.id === "step3" && (
                        <div className="my-auto flex flex-col justify-center space-y-2 w-full max-w-sm mx-auto font-mono">
                          <div className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#FF1E27] flex items-center justify-between">
                            <span>ምርXog BROADCAST NEWS FEED</span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                              Synced
                            </span>
                          </div>
                          <div className="bg-white dark:bg-neutral-900 p-3 rounded-xl border border-neutral-200 dark:border-white/5 space-y-2 relative shadow-xs">
                            <div className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 font-serif leading-tight">
                              "How Ethiopia's Multimedia Industry is Scaling with New Interactive Models"
                            </div>
                            <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                              <span>AUTHOR: YouTobia Desk</span>
                              <span>READ TIME: 3 min</span>
                            </div>
                            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-1 flex justify-between text-[8px] font-mono text-zinc-400 uppercase">
                              <span>Vetted Verification</span>
                              <span className="text-green-600 font-bold">Verified Vetted</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER 4 GRAPHIC: EnqoqCash riddle ticket */}
                      {step.id === "step4" && (
                        <div className="my-auto flex items-center justify-center py-2">
                          <motion.div 
                            className="bg-white dark:bg-neutral-900 border-2 border-dashed border-[#FF1E27] rounded-xl p-4 w-60 text-center relative overflow-hidden shadow-md"
                            animate={{ rotateY: [0, 15, 0, -15, 0], y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            style={{ perspective: 1000 }}
                          >
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#FF1E27]" />
                            <div className="flex justify-between items-center text-[7px] font-mono text-neutral-400 tracking-widest uppercase mb-2">
                              <span>እንቆቅCash RIDDLE ENTRY</span>
                              <span className="text-[#FF1E27] font-bold">#N903B</span>
                            </div>
                            <div className="w-10 h-10 mx-auto bg-[#FF1E27]/5 rounded-full flex items-center justify-center mb-2 border border-[#FF1E27]/20">
                              <Coins className="w-5 h-5 text-[#FF1E27]" />
                            </div>
                            <h4 className="font-serif italic text-neutral-800 dark:text-neutral-200 text-sm">Trivia Rewards Ledger</h4>
                            <div className="font-mono text-lg font-black text-[#FF1E27] tracking-tighter mt-1">
                              +1,500 ETB
                            </div>
                            <p className="text-[10px] text-[#FF1E27] font-mono uppercase tracking-[0.2em] mt-1 pr-1 pl-1">
                              VERIFIED PRIZE PASS
                            </p>
                          </motion.div>
                        </div>
                      )}

                      {/* Footer bar */}
                      <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                        <span className="text-[9px] font-mono text-neutral-400">
                          CHAPTER {step.num} // PORTFOLIO
                        </span>
                        <div className="flex items-center gap-1 text-[9px] font-mono text-neutral-500">
                          <span>YUTOBIA ECOSYSTEM</span>
                          <ChevronRight className="w-3 h-3 text-[#FF1E27]" />
                        </div>
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Action Trigger at the end of the Story Section */}
        <motion.div 
          className="mt-28 md:mt-40 text-center space-y-6 max-w-xl mx-auto border border-rose-100 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-[#FF1E27]/40 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#FF1E27] via-neutral-200 dark:via-white/10 to-[#FF1E27]" />
          <div className="absolute inset-0 bg-[#FF1E27]/[0.015] pointer-events-none" />
          
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl md:text-4xl text-neutral-900 dark:text-white tracking-tight leading-none"
          >
            Ready to test <br />
            <span className="text-[#FF1E27] font-display font-black tracking-tighter uppercase not-italic">your own mind?</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed font-sans font-light"
          >
            A diverse treasury of General Knowledge, Sports, Science, and History challenges backed by high-stakes score multipliers awaits. Leap inside the live interactive simulator gameplay environment.
          </motion.p>
          
          <div className="pt-2 flex justify-center">
            <button
              onClick={onPlayDemo}
              className="group flex items-center gap-3 bg-[#FF1E27] hover:bg-[#C90E16] text-white font-display font-bold py-4 px-8 rounded-xl scale-100 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-xl shadow-[#FF1E27]/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>LAUNCH ENQOQ CASH</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default StoryScrollJourney;
