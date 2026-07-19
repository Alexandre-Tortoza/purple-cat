'use client'

import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { ScrollStackContent } from '@/shared/ui/ScrollStackCard'

export function About() {
  return (
    <section id="sobre" className="bg-[#0d0917] py-16 sm:py-24 lg:py-32">
      <ScrollStackContent>
      <Container className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28"
        >
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Sobre o Purple Cat</p>
          <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">
            Música para estar presente.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl space-y-6 text-lg leading-relaxed text-zinc-400"
        >
          <p>
            O Purple Cat nasceu da vontade de criar um espaço onde a música pudesse ocupar o centro da experiência.
          </p>
          <p>
            Inspirado pelos listening bars e pelos kissaten japoneses, o espaço combina curadoria musical, discos de vinil, coquetelaria e uma cozinha feita para acompanhar cada momento.
          </p>
          <p>
            Mais do que um bar, o Purple Cat é um lugar para descobrir artistas, ouvir álbuns completos, compartilhar referências e encontrar pessoas que também acreditam que música merece atenção.
          </p>
          <p className="font-heading text-2xl leading-snug text-zinc-200 sm:text-3xl">
            Sem pressa. Sem excesso. Apenas boa música, bons drinks e encontros que fazem sentido.
          </p>
        </motion.div>
      </Container>
      </ScrollStackContent>
    </section>
  )
}
