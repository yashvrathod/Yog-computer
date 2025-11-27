"use client"

import { motion } from "framer-motion"
import type { Service } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  service: Service
  onInquire: (service: Service) => void
}

export function ServiceCard({ service, onInquire }: ServiceCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative aspect-[3/2] overflow-hidden bg-secondary/30">
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Tags overlay */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {service.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-background/90 text-foreground text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <CardContent className="p-6">
          <Badge variant="outline" className="mb-3 text-xs">
            {typeof service.category === 'string' ? service.category : service.category?.name || 'Uncategorized'}
          </Badge>

          <h3 className="font-semibold text-xl mb-3">{service.name}</h3>

          <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{service.description}</p>

          <Button
            className="w-full rounded-full group/btn bg-transparent"
            variant="outline"
            onClick={() => onInquire(service)}
          >
            Learn More
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
