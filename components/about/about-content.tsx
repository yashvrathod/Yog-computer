"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Award, Globe, Zap, Shield, Heart } from "lucide-react"

const milestones = [
  {
    year: "2003",
    title: "Company Founded",
    description: "Started with a vision to transform industrial operations through innovative solutions.",
  },
  {
    year: "2008",
    title: "First Major Contract",
    description: "Secured partnership with leading manufacturing company, establishing our reputation.",
  },
  {
    year: "2012",
    title: "International Expansion",
    description: "Opened offices in three countries, serving clients across multiple continents.",
  },
  {
    year: "2018",
    title: "Technology Innovation",
    description: "Launched AI-powered industrial solutions, leading the industry transformation.",
  },
  {
    year: "2023",
    title: "Sustainability Leader",
    description: "Achieved carbon-neutral operations and helped 100+ clients reduce their environmental impact.",
  },
]

const values = [
  {
    icon: CheckCircle,
    title: "Excellence",
    description: "We deliver exceptional quality in every project, exceeding expectations consistently.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with our clients as partners, building long-term relationships.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "We continuously invest in cutting-edge technology and creative solutions.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Our solutions create positive change for businesses and communities worldwide.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "We optimize operations to maximize productivity and minimize waste.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Our clients trust us to deliver consistent, dependable results every time.",
  },
]

const achievements = [
  { number: "500+", label: "Projects Completed" },
  { number: "50+", label: "Countries Served" },
  { number: "20+", label: "Years of Excellence" },
  { number: "98%", label: "Client Satisfaction" },
]

export function AboutContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref}>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6">
              About TechCorp Industries
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Transforming Industries Through{" "}
              <span className="text-primary">Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              For over two decades, TechCorp Industries has been at the forefront of industrial innovation,
              delivering cutting-edge solutions that drive efficiency, sustainability, and growth for businesses worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Two decades of growth, innovation, and partnership
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-start gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <Card className="flex-grow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">{value.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-8">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              Our Mission
            </h2>
            <blockquote className="text-2xl md:text-3xl font-medium text-muted-foreground mb-8 leading-relaxed">
              "To empower industries with innovative solutions that drive sustainable growth,
              operational excellence, and positive environmental impact for generations to come."
            </blockquote>
            <p className="text-lg text-muted-foreground">
              Every solution we create, every partnership we build, and every challenge we solve
              is guided by our commitment to making industry better for everyone.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}