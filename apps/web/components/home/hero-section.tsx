"use client";

import { motion, Variants } from "framer-motion";

export function HeroSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letter: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const asterisk: Variants = {
    hidden: { y: -300, opacity: 0, scale: 2 },
    show: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 2,
      },
    },
  };

  return (
    <div className="space-y-4">
      <motion.h1 
        className="text-6xl md:text-8xl font-black tracking-tighter flex items-end justify-center overflow-hidden pb-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {["V", "o", "i", "d"].map((char, index) => (
          <motion.span key={index} variants={letter}>
            {char}
          </motion.span>
        ))}
        <motion.span 
          variants={asterisk}
          className="text-primary inline-block origin-bottom ml-1"
        >
          *
        </motion.span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-xl md:text-2xl text-muted-foreground font-light"
      >
        무엇이든 담을 수 있는 공간
      </motion.p>
    </div>
  );
}