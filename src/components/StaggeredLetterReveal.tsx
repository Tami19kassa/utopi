import React from "react";
import { motion } from "motion/react";

interface StaggeredLettersProps {
  text: string;
  delay?: number;
  className?: string;
  once?: boolean;
}

export const StaggeredLetters: React.FC<StaggeredLettersProps> = ({ 
  text, 
  delay = 0, 
  className = "",
  once = true
}) => {
  const letters = text.split("");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.024,
        delayChildren: delay,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: 60,
      scale: 0.85
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 110,
        damping: 14
      } 
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12%" }}
      className={`inline-block ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {letters.map((char, index) => {
        if (char === " ") {
          return <span key={index} className="inline-block">&nbsp;</span>;
        }
        return (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block origin-bottom transform-gpu"
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
