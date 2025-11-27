"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-gradient-soft">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/abstract-holographic-crystal-texture-with-iridesce.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Enhanced blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background/95 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-blue-radial opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-5"
        >
          Since 2003
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15]"
        >
          Powering{" "}
          <span className="font-serif italic text-primary">modern</span>{" "}
          innovation for{" "}
          <span className="text-muted-foreground">forward-thinking</span>{" "}
          businesses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mt-8"
        >
          We deliver cutting-edge products and exceptional services that help
          businesses grow faster. From strategy to execution, we combine
          creativity, technology, and excellence.
        </motion.p>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 mb-8"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">500+</div>
            <div className="text-sm text-muted-foreground">Active Clients</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">98.5%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">20+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">25</div>
            <div className="text-sm text-muted-foreground">Industry Awards</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold shadow hover:shadow-lg transition-all"
          >
            <Link href="/products">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base backdrop-blur-sm border-white/20"
          >
            <Link href="/services">Our Services</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-8 h-14 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
