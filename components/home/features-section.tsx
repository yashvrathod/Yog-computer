"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    number: "1",
    title: "Premium Products",
    description:
      "A refined selection of world-class products, engineered to bring unmatched quality and performance.",
  },
  {
    number: "2",
    title: "Expert Services",
    description:
      "Handled by certified professionals delivering industry-standard precision and excellence.",
  },
  {
    number: "3",
    title: "Innovation First",
    description:
      "Future-ready solutions powered by cutting-edge technology and modern engineering.",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-28 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-background via-primary/[0.015] to-muted/20"
    >
      <div className="mx-auto max-w-7xl text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold tracking-tight"
        >
          What Makes Us Different
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto mt-4"
        >
          A blend of expertise, quality, and innovation — tailored to elevate
          your experience.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={feature.number}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group"
          >
            <Card
              className={cn(
                "relative h-full rounded-3xl overflow-hidden border border-white/10",
                "backdrop-blur-xl bg-white/5 transition-all",
                "group-hover:shadow-2xl group-hover:scale-[1.03] group-hover:border-white/20",
                "duration-300"
              )}
            >
              <CardContent className="px-10 py-12">
                {/* Animated Gradient Number */}
                <span
                  className={cn(
                    "text-7xl font-black block mb-6",
                    "bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent",
                    "transition-all duration-300 group-hover:opacity-90"
                  )}
                >
                  {feature.number}
                </span>

                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>

              {/* Glow on Hover */}
              <div
                className={cn(
                  "absolute inset-0 rounded-3xl transition-opacity duration-300",
                  "opacity-0 group-hover:opacity-10 bg-gradient-to-r from-primary to-blue-500"
                )}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
