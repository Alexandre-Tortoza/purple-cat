'use client'

import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { EVENTS } from '@/shared/config/site'
import { ScrollStackContent } from '@/shared/ui/ScrollStackCard'

export function Agenda() {
  return (
    <section id="agenda" className="border-y border-purple-900/20 bg-[#120b20] py-16 sm:py-24 lg:py-32">
      <ScrollStackContent>
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Agenda</p>
            <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Próximas audições</h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">Álbuns completos, lançamentos, sessões especiais, artistas convidados e encontros em torno da música.</p>
          </div>
          <span className="text-sm text-zinc-500">Programação sujeita a confirmação.</span>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {EVENTS.map((event, index) => (
            <motion.article
              key={event.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex min-h-[360px] flex-col rounded-2xl border border-white/10 bg-[#090710]/60 p-6"
            >
              <p className="text-xs font-medium tracking-[0.2em] text-purple-300 uppercase">{event.type}</p>
              <h3 className="mt-8 text-2xl leading-tight text-zinc-100">{event.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{event.description}</p>
              <dl className="mt-auto space-y-2 border-t border-white/10 pt-6 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-zinc-500">Data</dt><dd className="text-right text-zinc-200">{event.date}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-zinc-500">Horário</dt><dd className="text-right text-zinc-200">{event.time}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-zinc-500">Entrada</dt><dd className="text-right text-zinc-200">{event.admission}</dd></div>
              </dl>
              <a href="#agenda" className="mt-6 inline-flex text-sm font-medium text-purple-200 transition-colors hover:text-purple-100">Ver detalhes <span aria-hidden="true" className="ml-2">-&gt;</span></a>
            </motion.article>
          ))}
        </div>
        <a href="#agenda" className="mt-10 inline-flex rounded-sm border border-purple-300/40 px-6 py-3 text-sm font-medium text-purple-100 transition-all hover:bg-purple-500 hover:text-white hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(168,85,247,0.4)]">Ver agenda completa</a>
      </Container>
      </ScrollStackContent>
    </section>
  )
}
