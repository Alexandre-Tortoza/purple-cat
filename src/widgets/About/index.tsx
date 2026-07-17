'use client'

import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'

export function About() {
  return (
    <section id="about" className="border-t border-purple-900/20 bg-[#090710] py-24">
      <Container className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sobre o{' '}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Purple Cat
            </span>
          </h2>

          <div className="mt-6 space-y-4 text-zinc-400">
            <p>
              Purple Cat é mais que um bar de jazz — é um refúgio para os amantes da
              música ao vivo e da boa companhia. Aqui, cada noite conta uma história
              diferente.
            </p>
            <p>
              Entre sons de saxofone, luzes baixas e a energia única do jazz, criamos
              um ambiente onde o tempo parece parar. Venha descobrir o seu lugar
              favorito na cidade.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Shows por Ano', value: '200+' },
              { label: 'Artistas', value: '150+' },
              { label: 'Gin & Tônicas', value: '50+' },
              { label: 'Noites Memoráveis', value: '∞' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-purple-900/30 bg-purple-950/20 p-5 text-center"
              >
                <div className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
