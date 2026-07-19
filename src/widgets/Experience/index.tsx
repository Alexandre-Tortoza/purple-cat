'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { EXPERIENCES } from '@/shared/config/site'

const HOVER_BG = 'rgba(53, 20, 95, 0.5)'
const DEFAULT_BG = '#0d0917'

function cardBg(index: number, hovered: number | null): string {
  if (hovered === null) return DEFAULT_BG
  if (hovered === index) return HOVER_BG
  return DEFAULT_BG
}

export function Experience() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="experiencia" className="bg-[#090710] py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Experiência</p>
          <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Três formas de viver o Purple Cat</h2>
        </div>
        <div
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 transition-shadow duration-300 lg:grid-cols-3"
          style={{
            boxShadow: hovered !== null ? '0 0 36px rgba(124, 58, 237, 0.2)' : undefined,
          }}
        >
          {EXPERIENCES.map((experience, index) => (
            <motion.article
              key={experience.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-h-80 p-7 transition-[background-color,box-shadow] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:p-9"
              style={{
                backgroundColor: cardBg(index, hovered),
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="text-sm text-purple-300">{experience.number}</span>
              <h3 className="mt-14 text-2xl text-zinc-100">{experience.title}</h3>
              <p className="mt-4 leading-relaxed text-zinc-400">{experience.description}</p>
              <p className="mt-5 text-sm leading-relaxed text-zinc-500">{experience.detail}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
