"use client";

import { useState, useEffect, useRef } from "react";
import { BlobImage } from "@/components/ui/blob-image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { HobbiesHorizontalStrip } from "./hobbies-horizontal-strip";
import { HOBBIES } from "../../data/hobbies";
import { Container } from "@/components/shared/container";

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const headingItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const BEYOND_SCREEN_IMAGES = [
  "/beyond-screen.png",
  "/beyond-screen-1.png",
];

export default function Hobbies() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BEYOND_SCREEN_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <Container
      id="hobbies"
      aria-label="Hobbies and personal projects"
      fullWidth
    >
      <motion.div
        ref={containerRef}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="px-5 sm:px-8 lg:px-12 pb-0 max-w-7xl mx-auto flex flex-row items-center justify-between gap-8 lg:gap-12"
      >
        <div className="flex-1 max-w-2xl shrink-0">
          {/* Eyebrow */}
          <motion.div
            variants={headingItemVariants}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
              Beyond the keyboard
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={headingItemVariants}
            className="text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
          >
            What I build
            <br />
            <span className="text-primary">off-screen.</span>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            variants={headingItemVariants}
            className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Engineering doesn&apos;t stop when I close VS Code. Whether it&apos;s a 3D-printed
            airframe, a trail summit, or a sunrise from a cliff edge — the process
            is always the same: understand, design, build, improve, repeat.
          </motion.p>
        </div>

        {/* Beyond Screen Image */}
        <motion.div
          variants={headingItemVariants}
          className="hidden md:block relative shrink-0 w-[40%] h-[stretch]"
        >
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <BlobImage
                src={BEYOND_SCREEN_IMAGES[currentImageIndex]}
                alt="Beyond the screen"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <HobbiesHorizontalStrip hobbies={HOBBIES} />
    </Container>
  );
}
