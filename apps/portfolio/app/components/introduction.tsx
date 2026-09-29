"use client";

import { motion, Variants } from "framer-motion";
import { BlobImage } from "@/components/ui/blob-image";
import { SmoothScrollLink } from "@riselikesun/ui";
import { Button, Link } from "@riselikesun/ui";
import { ArrowUpRight } from "@riselikesun/ui/icons";
import { Container } from "@/components/shared/container";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const stats = [
  { value: "7+", label: "Years of\nExperience" },
  { value: "50M+", label: "Users\nImpacted" },
  { value: "15+", label: "Projects\nDelivered" },
];

export default function IntroSection() {
  return (
    <Container fullWidth id="intro" aria-label="About Suraj Sharma — Best Full Stack Engineer in India" background="black" className="relative">
      {/* Full-bleed ambient glow — anchored to left side behind the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[45%] aspect-square bg-[radial-gradient(circle,rgba(216,148,50,0.12)_0%,transparent_70%)] blur-3xl"
      />

      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center relative z-10">

        {/* ── Left: Portrait ── */}
        <motion.div
          className="relative justify-center lg:justify-end hidden lg:flex "
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Glow disc behind image */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-32 bg-primary/20 blur-3xl rounded-full"
          />

          <div className="relative w-full h-144 sm:h-168 md:h-208 lg:h-150 xl:h-175 max-h-180 z-10">
            {/* Desktop Image */}
            <BlobImage
              src="/intro-image.png"
              alt="Suraj Sharma — Full Stack Engineer India"
              fill
              loading="eager"
              className="object-contain drop-shadow-[0_0_60px_rgba(216,148,50,0.15)]"
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </div>
        </motion.div>

        {/* ── Right: Content ── */}
        <motion.div
          className="flex flex-col gap-8 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: .05 }}
        >
          <motion.div variants={itemVariants} className="text-xs font-semibold tracking-[0.35em] uppercase text-primary">
            Full Stack Engineer · Team Lead · India
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight text-default"
          >
            The Engineer Behind{" "}
            <span className="text-primary">
              Products That Scale.
            </span>
          </motion.h2>
          <motion.div
          className="relative flex justify-center lg:hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Glow disc behind image */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-32 bg-primary/20 blur-3xl rounded-full"
          />

          <div className="relative w-full h-82 max-h-180 z-10">
            <BlobImage
              src="/intro-image-mobile.png"
              alt="Suraj Sharma — Full Stack Engineer India"
              fill
              loading="eager"
              className="object-contain drop-shadow-[0_0_60px_rgba(216,148,50,0.15)]"
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </div>
        </motion.div>
          <motion.div variants={itemVariants} className="max-w-lg mx-auto lg:mx-0 text-base md:text-lg text-muted-foreground leading-relaxed">
            I&apos;m{" "}<strong className="text-accent-foreground font-semibold">Suraj Sharma,</strong>
            {" "} a Staff Web Developer and one of India&apos;s most sought-after
            full stack engineers. I&apos;ve shipped products used by{" "}
            <strong className="text-accent-foreground font-semibold">50 million+ people</strong>{" "}
            globally, led cross-functional teams, and built AI-powered platforms
            that redefine what software can do. From scaling Infoblox&apos;s
            marketing tech to engineering{" "}
            <Link
              variant="underline"
              href="https://quillbot.com/paraphrasing-tool"
              title="QuillBot Paraphrasing Tool"
            >
              QuillBot
            </Link>&apos;s core writing product, I build things that last.
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6 pt-2"
          >
            {stats.map(({ value, label }) => (
              <div key={value} className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                  {value}
                </span>
                <span className="text-xs text-secondary-foreground/50 font-medium leading-tight uppercase tracking-widest whitespace-pre-line text-center lg:text-left">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2"
          >
            <Button asChild cursor="pointer" iconHover="up-right">
              <SmoothScrollLink href="#contact" title="Let's work together">
                Let&apos;s Work Together
                <ArrowUpRight strokeWidth={2.5} />
              </SmoothScrollLink>
            </Button>
            <Button asChild variant="secondary" cursor="pointer">
              <SmoothScrollLink href="#professional-experience" title="View my professional experience">
                View My Work
              </SmoothScrollLink>
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </Container>
  );
}