"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section ref={ref} className="py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium text-muted-foreground italic mb-3">
              The gist of it
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-6 leading-snug">
              Crafting digital experiences
              <br />
              that connect, inspire, and deliver results.
            </h2>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              We help forward-thinking companies at the forefront of innovation
              sharpen their story, elevate their market presence, and win in
              their industry. From product development to digital strategy, we
              blend creative vision with technical execution to drive meaningful
              outcomes— whether that&apos;s adoption, trust, or growth.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
