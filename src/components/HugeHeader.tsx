import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import YutobiaLogo from "./YutobiaLogo";
import { Menu, X, ArrowUpRight, Globe, Flame, Briefcase, Mail, BookOpen, Sun, Moon, Layers } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  gameScore: number;
  theme: string;
  onToggleTheme: () => void;
}

export const HugeHeader: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
  gameScore,
  theme,
  onToggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    {
      num: "01",
      label: "HOME",
      desc: "Where digital ambition meets absolute craft.",
      id: "home",
      icon: <Globe className="w-5 h-5 text-brand" />,
    },
    {
      num: "02",
      label: "BRAND ECOSYSTEM",
      desc: "Our customized sub-brands: ቀናView, eTop Production, የንታBarsiisaa, ምርXog and እንቆቅCash.",
      id: "brand-ecosystem",
      icon: <Layers className="w-5 h-5 text-brand" />,
    },
    {
      num: "03",
      label: "STUDIO & WORKS",
      desc: "Inside our multimedia projects, digital solutions, and creative portfolio.",
      id: "studio",
      icon: <Briefcase className="w-5 h-5 text-brand" />,
    },
    {
      num: "04",
      label: "CONNECT",
      desc: "Let's build something beautiful. Our team is responsive and ready.",
      id: "connect",
      icon: <Mail className="w-5 h-5 text-brand" />,
    },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      onNavigate(id);
    }, 450); // allow menu closing animation to play smoothly
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-45 border-b border-rose-100 bg-white/90 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={() => onNavigate("home")}
          id="hdr-logo-btn"
        >
          <YutobiaLogo size={42} />
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-10 font-mono text-xs tracking-widest font-medium">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative py-2 text-left cursor-pointer transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-brand font-bold"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

          {/* Status / Game Interaction Counter */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("enqoq-cash")}
            className="hidden sm:flex items-center gap-2 bg-brand/10 hover:bg-brand/20 border border-brand/20 hover:border-brand/40 text-brand px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 group"
          >
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            <span>Enqoq Demo</span>
            <span className="bg-brand text-white px-2 py-0.5 rounded-full font-bold ml-1 text-[10px] group-hover:scale-110 transition-transform">
              Score: {gameScore}
            </span>
          </button>

          {/* Animated Theme Toggler */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-white/10 rounded-full p-2.5 transition-all duration-300 cursor-pointer relative overflow-hidden active:scale-95 group"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            id="theme-toggler-btn"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="dark-sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="light-moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Menu Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 bg-neutral-100 hover:bg-red-50 text-neutral-800 hover:text-brand border border-neutral-200 hover:border-brand/30 rounded-full p-2.5 sm:px-4 sm:py-2.5 transition-all active:scale-95 z-50 relative group"
            id="hdr-menu-toggle"
          >
            <span className="text-xs font-mono tracking-widest hidden sm:inline text-neutral-700 font-bold group-hover:text-brand">
              {isOpen ? "CLOSE" : "MENU"}
            </span>
            <div className="relative w-5 h-5 flex items-center justify-center">
              {isOpen ? (
                <X className="w-5 h-5 text-neutral-800 group-hover:text-brand" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-800 group-hover:text-brand" />
              )}
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen Huge Style Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-between overflow-hidden"
          >
            {/* Split Overlay Sliding Background */}
            <div className="absolute inset-0 flex pointer-events-none">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="w-1/2 h-full bg-neutral-50 border-r border-[#FF1E27]/10 origin-left"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="w-1/2 h-full bg-neutral-50 border-l border-[#FF1E27]/10 origin-right"
              />
            </div>

            {/* Glowing red splash inside menu */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 w-full h-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 flex-1 items-center">
              {/* Menu listings */}
              <div className="lg:col-span-8 flex flex-col justify-center gap-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group"
                  >
                    <button
                      onClick={() => handleLinkClick(item.id)}
                      className="text-left w-full flex items-baseline gap-4 md:gap-8 group select-none py-1 sm:py-3 cursor-pointer"
                    >
                      <span className="font-mono text-xs md:text-sm text-brand font-medium">
                        {item.num}
                      </span>
                      <span className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tighter text-neutral-800 hover:text-brand transition-colors duration-300 uppercase leading-[1.05]">
                        {item.label}
                      </span>
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 w-6 h-6 sm:w-10 sm:h-10 text-brand self-center" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Sidebar Description Detail (Changes on Hover) */}
              <div className="lg:col-span-4 hidden lg:flex flex-col justify-center border-l border-[#FF1E27]/20 pl-8 h-[360px]">
                <AnimatePresence mode="wait">
                  {hoveredIndex !== null ? (
                    <motion.div
                      key={hoveredIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3">
                        {menuItems[hoveredIndex].icon}
                        <span className="font-mono text-xs tracking-widest text-[#FF1E27] font-semibold">
                          YOUTOBIA CREATIVE
                        </span>
                      </div>
                      <h3 className="font-serif italic text-4xl text-neutral-900 tracking-tight leading-none">
                        {menuItems[hoveredIndex].label}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed max-w-xs font-sans font-light">
                        {menuItems[hoveredIndex].desc}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <YutobiaLogo size={50} showText={false} />
                      <h3 className="font-serif italic text-2xl text-neutral-800 tracking-widest leading-none">
                        YOUTOBIA
                      </h3>
                      <p className="text-neutral-500 text-xs leading-relaxed font-mono">
                        HOVER OVER ANY NAVIGATION TAB TO EXPLORE THE MULTIMEDIA UNIVERSE.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Menu Footer */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-8 border-t border-neutral-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-6 text-[11px] font-mono text-neutral-400">
                <span>© {new Date().getFullYear()} YouTobia Multimedia</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex gap-6 font-mono text-[11px] text-[#FF1E27]">
                <button
                  onClick={() => handleLinkClick("enqoq-cash")}
                  className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>PLAY ENQOQ CASH</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default HugeHeader;
