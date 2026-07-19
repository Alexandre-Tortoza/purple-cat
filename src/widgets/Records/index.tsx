'use client'

import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { RECORD_COLLECTIONS, SITE } from '@/shared/config/site'

export function Records() {
  return (
    <section id="discos" className="bg-[#090710] py-24 sm:py-32">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Loja de discos</p>
          <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Discos para levar a experiência para casa</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">Nossa seleção reúne lançamentos, clássicos, discos independentes e escolhas que fazem parte da identidade musical do Purple Cat.</p>
          <p className="mt-5 max-w-lg leading-relaxed text-zinc-500">Cada disco é escolhido com atenção, considerando não apenas gênero ou época, mas também história, produção e experiência de escuta.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {RECORD_COLLECTIONS.map((collection, index) => (
              <article key={collection.title} className="flex gap-5 py-6 sm:gap-8">
                <span className="font-heading text-3xl text-purple-400/80">0{index + 1}</span>
                <div><h3 className="text-xl text-zinc-100">{collection.title}</h3><p className="mt-2 leading-relaxed text-zinc-500">{collection.description}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-purple-400/15 bg-purple-950/20 p-6">
            <h3 className="text-lg text-zinc-100">Procurando um disco?</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">Fale com a equipe para consultar disponibilidade, encomendas e novos títulos.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE.recordsUrl} className="inline-flex rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400">Ver seleção de discos</a>
            <a href="#discos" className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-purple-300/50 hover:bg-white/5">Consultar um título</a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
