'use client'

import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { EXPERIENCES } from '@/shared/config/site'

export function Experience() {
  return (
    <section id="experiencia" className="bg-[#090710] py-24 sm:py-32">
      <Container>
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Experiência</p>
          <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Três formas de viver o Purple Cat</h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
          {EXPERIENCES.map((experience, index) => (
            <motion.article
              key={experience.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-h-80 bg-[#0d0917] p-7 sm:p-9"
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
