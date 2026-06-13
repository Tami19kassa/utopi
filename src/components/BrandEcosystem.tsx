import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StaggeredLetters } from "./StaggeredLetterReveal";
import { 
  Sparkles, 
  Tv, 
  Film, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Compass, 
  Users, 
  TrendingUp, 
  Globe, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  Clock,
  Play
} from "lucide-react";

interface SubBrand {
  id: string;
  num: string;
  title: string;
  amharicTitle?: string;
  subtitle: string;
  purpose: string;
  icon: React.ReactNode;
  color: string;
  bgGrad: string;
  pillars: {
    title: string;
    desc: string;
  }[];
}

export const BrandEcosystem: React.FC<{ onPlayDemo?: () => void }> = ({ onPlayDemo }) => {
  const [activeBrandId, setActiveBrandId] = useState<string>("enqoq");

  const parentValues = [
    {
      title: "Innovation",
      desc: "Pushing boundaries in multimedia technologies and trends.",
      bg: "bg-red-500/5",
      border: "border-red-500/10",
      icon: <TrendingUp className="w-5 h-5 text-[#FF1E27]" />
    },
    {
      title: "Creativity",
      desc: "Fostering original, high-quality content creation.",
      bg: "bg-orange-500/5",
      border: "border-orange-500/10",
      icon: <Sparkles className="w-5 h-5 text-orange-500" />
    },
    {
      title: "Collaboration",
      desc: "Building strong partnerships across the multimedia landscape.",
      bg: "bg-blue-500/5",
      border: "border-blue-500/10",
      icon: <Users className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Integrity",
      desc: "Upholding transparency and trust in every endeavor.",
      bg: "bg-green-500/5",
      border: "border-green-500/10",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      title: "Diversity & Inclusion",
      desc: "Promoting a wide range of voices, ideas, and perspectives.",
      bg: "bg-purple-500/5",
      border: "border-purple-500/10",
      icon: <Globe className="w-5 h-5 text-purple-500" />
    }
  ];

  const subBrands: SubBrand[] = [
    {
      id: "enqoq",
      num: "01",
      title: "EnqoqCash",
      amharicTitle: "እንቆቅCash",
      subtitle: "Flagship Interactive Quiz Ecosystem",
      purpose: "እንቆቅCash (EnqoqCash) is a regulated, multi-platform, knowledge-driven trivia network designed to connect and reward intellect.",
      icon: <HelpCircle className="w-6 h-6 text-white" />,
      color: "#FF1E27",
      bgGrad: "from-rose-600 to-red-700",
      pillars: [
        { title: "Intellect Rewards", desc: "Monetizing and celebrating cognitive trivia depth." },
        { title: "Multi-Platform Scope", desc: "Seamless accessibility across web, mobile, and television environments." },
        { title: "General Knowledge", desc: "Curating verified trivia on History, Science, Sports, and Culture." },
        { title: "Trivia Network", desc: "Regulated framework driving trustworthy, high-engagement competitions." }
      ]
    },
    {
      id: "qenaview",
      num: "02",
      title: "QenaView",
      amharicTitle: "ቀናView",
      subtitle: "Multimedia Streaming & Distribution",
      purpose: "To revolutionize how people access and experience multimedia content by offering a platform that is both technologically advanced and user-friendly, catering to diverse entertainment needs.",
      icon: <Tv className="w-6 h-6 text-white" />,
      color: "#0284c7",
      bgGrad: "from-sky-500 to-blue-600",
      pillars: [
        { title: "Accessibility", desc: "Content easily accessible to a diverse global audience anywhere, anytime." },
        { title: "Quality", desc: "High-definition, premium content delivery across all genres with pristine playback." },
        { title: "Innovation", desc: "Exploring new streaming technologies and highly-immersive user experiences." },
        { title: "User-Centric", desc: "Tailored experiences crafted precisely around user preferences and live feedback." }
      ]
    },
    {
      id: "etop",
      num: "03",
      title: "eTop Production",
      amharicTitle: "eTop production",
      subtitle: "Multimedia Content Production",
      purpose: "To become a leading multimedia production house that creates compelling stories and fosters a creative ecosystem where artists and producers push the boundaries of content creation.",
      icon: <Film className="w-6 h-6 text-white" />,
      color: "#f97316",
      bgGrad: "from-orange-500 to-amber-600",
      pillars: [
        { title: "Creativity", desc: "Bold, innovative, highly-original content structure that captivates communities." },
        { title: "Collaboration", desc: "Fusing diverse talents together to produce world-class, premium multimedia." },
        { title: "Excellence", desc: "Demanding and maintaining the absolute highest standards in every single phase of production." },
        { title: "Sustainability", desc: "Adopting eco-friendly, socially responsible video, sound, and lighting practices." }
      ]
    },
    {
      id: "yenta",
      num: "04",
      title: "YentaBarsiisaa",
      amharicTitle: "የንታBarsissa",
      subtitle: "Multimedia Skills & Education Hub",
      purpose: "To be the premier hub for multimedia education, where aspiring and seasoned professionals learn the latest skills and techniques needed to excel in the dynamic multimedia landscape.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      color: "#8b5cf6",
      bgGrad: "from-purple-500 to-violet-600",
      pillars: [
        { title: "Empowerment", desc: "Equipping learners with technical, creative, and commercial skills to thrive." },
        { title: "Innovation", desc: "Deploying cutting-edge tools and modern methods for media arts education." },
        { title: "Inclusion", desc: "Guaranteeing opportunities for learners from all backgrounds, regardless of experience." },
        { title: "Lifelong Learning", desc: "Nurturing continuous skill development in a fast-evolving technological landscape." }
      ]
    },
    {
      id: "mirxog",
      num: "05",
      title: "MirXog",
      amharicTitle: "ምርXog",
      subtitle: "Multimedia Information Hub",
      purpose: "To serve as the go-to information hub for all things multimedia — offering insights, news, and analysis to help creators, businesses, and enthusiasts stay ahead in the rapidly evolving multimedia world.",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      color: "#10b981",
      bgGrad: "from-teal-500 to-emerald-600",
      pillars: [
        { title: "Accuracy", desc: "Well-researched, deep, reliable, and continuously up-to-date industry calculations." },
        { title: "Transparency", desc: "Strictly clear, unbiased insights, news disclosures, and independent reporting." },
        { title: "Community", desc: "Forging a trusted network of multimedia experts, beginners, and enthusiasts." },
        { title: "Curiosity", desc: "Encouraging exploration and bold discovery of emerging styles and standards." }
      ]
    }
  ];

  const visionForward = [
    { title: "Create", desc: "Original, high-quality multimedia content.", textCol: "text-red-500" },
    { title: "Stream", desc: "Accessible, immersive viewing experiences.", textCol: "text-sky-500" },
    { title: "Educate", desc: "Empower learners at every level.", textCol: "text-purple-500" },
    { title: "Inform", desc: "Trusted insights for the multimedia world.", textCol: "text-emerald-500" }
  ];

  const activeBrand = subBrands.find(b => b.id === activeBrandId) || subBrands[0];

  return (
    <section id="brand-ecosystem" className="relative py-28 md:py-40 bg-gradient-to-b from-[#FAF8F3] via-[#FCFAF6] to-[#F3F0E8] dark:from-[#060606] dark:via-[#090909] dark:to-[#060606] border-t border-neutral-200/45 dark:border-white/5 px-6 md:px-12 overflow-hidden transition-colors duration-500">
      
      {/* Editorial Decorative Background Details */}
      <div className="absolute inset-0 huge-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute left-[3%] top-[40%] text-neutral-100 font-display font-black text-[12rem] xl:text-[20rem] leading-none select-none pointer-events-none tracking-tighter uppercase">
        PLC
      </div>

      <div className="max-w-7xl mx-auto space-y-32 relative z-10">
        
        {/* PART 1: THE CONGLOMERATE HOLDING COMPANY */}
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-zinc-200 pb-12">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-semibold">
                SYSTEM PORTFOLIO: THE OVERSEER (P.L.C.)
              </span>
              <h2 className="font-serif italic text-4xl sm:text-6xl text-neutral-900 tracking-tight leading-none">
                <StaggeredLetters text="YouTobia Multimedia" /> <br />
                <span className="text-[#FF1E27] font-display font-black tracking-tighter uppercase not-italic">
                  <StaggeredLetters text="P.L.C. Holdings" delay={0.3} />
                </span>.
              </h2>
            </div>
            
            <div className="lg:col-span-6 space-y-5">
              <p className="font-serif text-lg leading-relaxed text-zinc-700 italic">
                "A bold vision uniting creativity, technology, entertainment, information, and education — delivered through a powerful ecosystem of purpose-built brands."
              </p>
              <div className="p-5 bg-white border border-rose-100/40 rounded-xl shadow-xs">
                <span className="block font-mono text-[9px] tracking-widest text-[#FF1E27] font-bold uppercase mb-1">
                  OUR CONSOLIDATED PURPOSE
                </span>
                <p className="text-zinc-600 text-sm leading-relaxed font-sans font-light">
                  To become a leading force in the multimedia industry by bringing together creativity, technology, entertainment, information, and education to deliver exceptional content, innovative tools, and trusted information.
                </p>
              </div>
            </div>
          </div>

          {/* Holding Company Pillar Core Values Grid */}
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-zinc-400 block tracking-widest">HOLDING QUALITY PILLARS</span>
              <h3 className="font-serif italic text-2xl text-zinc-800">Our Core Unifying Values</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {parentValues.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(255,30,39,0.05)" }}
                  className={`${val.bg} border ${val.border} p-6 rounded-2xl flex flex-col justify-between min-h-[180px] transition-all`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                    {val.icon}
                  </div>
                  <div className="space-y-2 mt-4">
                    <h4 className="font-serif italic text-lg text-neutral-900">{val.title}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-sans font-light">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* PART 2: INTERACTIVE THE 5 SUB-BRANDS EXPLORER */}
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-semibold">
              02 / SUBSIDIARY SUB-BRANDS
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-neutral-900 tracking-tight">
              <StaggeredLetters text="The 5 Specialized Ecosystem Segments" />
            </h2>
            <p className="text-zinc-550 max-w-xl text-sm font-sans font-light">
              Each YouTobia sub-brand carries a distinct operational license and creative identity, while sharing our core commitment to innovation, quality, and community.
            </p>
          </div>

          {/* Brand Selection Dashboard Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Sidebar Buttons containing the 5 items */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {subBrands.map((brand, idx) => {
                const isActive = brand.id === activeBrandId;
                return (
                  <motion.button
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                    }}
                    key={brand.id}
                    onClick={() => setActiveBrandId(brand.id)}
                    className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all duration-300 group cursor-pointer ${
                      isActive 
                        ? "bg-white border-[#FF1E27] shadow-md scale-102"
                        : "bg-white/60 hover:bg-white border-zinc-200 hover:border-zinc-350"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          isActive ? "bg-[#FF1E27] text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
                        }`}
                        style={isActive ? { backgroundColor: brand.color } : {}}
                      >
                        {isActive ? brand.icon : <Layers className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif italic text-base text-zinc-800 font-bold">
                            {brand.title}
                          </span>
                          {brand.amharicTitle && (
                            <span className="text-[11px] font-mono font-black text-[#FF1E27] px-1 bg-red-50 dark:bg-zinc-800 rounded">
                              {brand.amharicTitle}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-450 block truncate max-w-[190px]">
                          {brand.subtitle}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform ${
                      isActive ? "text-[#FF1E27] translate-x-1" : ""
                    }`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Main Details Panel block with transition effects */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm relative min-h-[460px] flex flex-col justify-between overflow-hidden"
            >
              
              {/* Floating Large watermark in panel background */}
              <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 text-zinc-900 font-serif italic text-[12rem] select-none uppercase">
                {activeBrand.num}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBrand.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Panel Header */}
                  <div className="flex items-center justify-between border-b border-zinc-150 pb-5">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-black">
                        SUB-BRAND PORTFOLIOS // {activeBrand.num} OF 05
                      </span>
                      <h3 className="font-serif italic text-3xl text-zinc-900 font-extrabold flex items-center gap-2">
                        {activeBrand.title}
                        {activeBrand.amharicTitle && (
                          <span className="not-italic text-lg text-[#FF1E27] font-display font-black bg-red-50 px-2 py-0.5 rounded-lg border border-red-500/10">
                            {activeBrand.amharicTitle}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm font-mono text-zinc-500 font-bold">
                        {activeBrand.subtitle}
                      </p>
                    </div>

                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}
                      style={{ backgroundColor: activeBrand.color }}
                    >
                      {activeBrand.icon}
                    </div>
                  </div>

                  {/* Purpose statement block */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] tracking-widest text-[#FF1E27] font-bold uppercase block">
                      OPERATIONAL FOCUS & PURPOSE
                    </span>
                    <p className="font-serif text-lg md:text-xl text-zinc-800 italic leading-relaxed">
                      "{activeBrand.purpose}"
                    </p>
                  </div>

                  {/* Pillars/Features inside sub-brand */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-[#FF1E27] uppercase font-black block">
                        CORE STRATEGIC PILLARS & DISCIPLINE
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400 hidden sm:inline-block">
                        // SECURE OPERATIONAL VECTORS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group/deck">
                      {activeBrand.pillars.map((pil, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.08 }}
                          whileHover={{ 
                            scale: 1.025, 
                            y: -4,
                            zIndex: 10,
                            boxShadow: "0 20px 40px -15px rgba(18, 18, 16, 0.08)"
                          }}
                          className="relative overflow-hidden bg-white hover:bg-neutral-50/20 border border-neutral-200/60 dark:border-white/10 p-5 rounded-2xl flex flex-col justify-between transition-all duration-350 group/item cursor-pointer min-h-[140px] group-hover/deck:opacity-60 hover:!opacity-100"
                        >
                          {/* Top accent glow layout */}
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl opacity-60 group-hover/item:opacity-100 group-hover/item:w-[6px] transition-all duration-300"
                            style={{ backgroundColor: activeBrand.color }}
                          />

                          {/* Dynamic Watermark Background Grid */}
                          <div className="absolute inset-0 opacity-[0.015] group-hover/item:opacity-[0.045] pointer-events-none transition-opacity duration-300 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />

                          {/* Giant luxury watermark index in matching sub-brand color */}
                          <div 
                            className="absolute right-4 top-1 text-[4rem] font-mono font-black select-none pointer-events-none leading-none opacity-[0.05] group-hover/item:opacity-[0.12] transition-opacity duration-500 italic"
                            style={{ color: activeBrand.color }}
                          >
                            0{idx + 1}
                          </div>

                          <div className="space-y-2 relative z-10">
                            {/* Technical Meta Tag */}
                            <div className="flex items-center gap-1.5">
                              <span 
                                className="text-[8.5px] font-mono tracking-[0.15em] uppercase font-bold"
                                style={{ color: activeBrand.color }}
                              >
                                {activeBrand.title.toUpperCase().slice(0, 10)} // 0{idx + 1}
                              </span>
                            </div>

                            {/* Core Title */}
                            <h4 className="font-serif italic text-[16px] text-zinc-900 dark:text-neutral-100 group-hover/item:text-[#FF1E27] font-semibold tracking-tight transition-colors flex items-center gap-2">
                              {pil.title}
                            </h4>
                          </div>

                          {/* Operational Description */}
                          <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-sans font-light pl-0 pt-2.5 border-t border-dashed border-neutral-200/50 dark:border-white/5 relative z-10">
                            {pil.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic bottom CTA button depending on the brand card index */}
              <div className="pt-8 border-t border-zinc-150 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  // YouTobia Enterprise Protocol SYNCED
                </span>

                {activeBrand.id === "enqoq" ? (
                  <button
                    onClick={onPlayDemo}
                    className="flex items-center gap-2 bg-[#FF1E27] hover:bg-[#C90E16] text-white font-display font-medium text-xs px-5 py-3 rounded-lg transition-all scale-100 hover:scale-102 active:scale-95 cursor-pointer shadow-md shadow-brand/10"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>LAUNCH INTERACTIVE QUIZ</span>
                  </button>
                ) : (
                  <a
                    href="#connect"
                    className="inline-flex items-center gap-2 border border-zinc-200 hover:border-zinc-350 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-mono tracking-widest px-5 py-3 rounded-lg transition-all"
                  >
                    <span>ACQUIRE SERVICE RIGHTS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                )}
              </div>

            </motion.div>

          </motion.div>
        </div >

        {/* PART 3: THE VISION FORWARD SUMMARY */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.8,
                staggerChildren: 0.1,
                delayChildren: 0.2
              } 
            }
          }}
          className="bg-[#0c0c0c] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-xl border border-white/5"
        >
          {/* Subtle light pulse background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,30,39,0.1),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 huge-grid-pattern opacity-5 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 14 } }
              }}
              className="lg:col-span-5 space-y-4"
            >
              <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]" />
                COMMITTED PATHWAYS
              </span>
              <h3 className="font-serif italic text-4xl sm:text-5xl text-white tracking-tight leading-none">
                <StaggeredLetters text="The Vision" /> <br />
                <span className="font-display font-black tracking-tighter uppercase not-italic text-[#FF1E27]">
                  <StaggeredLetters text="Forward" delay={0.25} />
                </span>.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans font-light pt-2 max-w-sm">
                We unify five integrated sub-brands into one cohesive loop—facilitating complete content design, worldwide streaming networks, modern training, and news delivery.
              </p>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
              {visionForward.map((vis, i) => (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  key={vis.title}
                  className="bg-zinc-900/55 border border-white/[0.04] p-5 rounded-2xl space-y-2 hover:border-[#FF1E27]/30 transition-all select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-zinc-500">0{i+1}</span>
                    <h4 className={`font-serif italic text-xl ${vis.textCol}`}>
                      {vis.title}
                    </h4>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans font-light">
                    {vis.desc}
                  </p>
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
