"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AboutFeatureSectionProps {
  direction: "left" | "right";
  imageUrl: string;
  imageAlt: string;
  children: ReactNode;
}

export function AboutFeatureSection({
  direction,
  imageUrl,
  imageAlt,
  children,
}: AboutFeatureSectionProps) {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* 이미지 섹션 */}
        <motion.div
          initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className={`
            relative 
            ${direction === "right" ? "md:order-2" : "md:order-1"}
            order-1
          `}
        >
          <div className="relative aspect-4/5 md:aspect-square w-full overflow-hidden rounded-none">
            <motion.img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.05 }}
            />
            {/* 세련된 테두리 장식 */}
            <div className="absolute inset-0 border border-black/10 dark:border-white/10 pointer-events-none" />
          </div>
        </motion.div>

        {/* 콘텐츠 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className={`
            ${direction === "right" ? "md:order-1" : "md:order-2"}
            order-2
          `}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
