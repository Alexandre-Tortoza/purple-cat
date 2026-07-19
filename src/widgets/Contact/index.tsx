'use client'

import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { SITE } from '@/shared/config/site'

export function Contact() {
  return (
    <section id="visite" className="border-t border-purple-900/20 bg-[#090710] py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Visite</p>
          <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Venha conhecer o Purple Cat</h2>
          <div className="mt-8 border-l border-purple-400/50 pl-5 text-zinc-300">
            <p className="font-medium">Purple Cat Listening Bar & Records</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">{SITE.address}<br />{SITE.neighborhood}<br />{SITE.zipCode}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={SITE.mapUrl} className="inline-flex rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400">Abrir no mapa</a>
            <a href={SITE.reservationUrl} className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-purple-300/50 hover:bg-white/5">Consultar reserva</a>
          </div>
          <p className="mt-6 text-sm text-zinc-500">Confirme os horários e as regras de atendimento antes da visita.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.12 }} className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-medium tracking-[0.22em] text-purple-300 uppercase">Loja de discos</p>
            <dl className="mt-6 space-y-5 text-sm">
              <div><dt className="text-zinc-500">Segunda-feira</dt><dd className="mt-1 text-zinc-200">12h às 16h</dd></div>
              <div><dt className="text-zinc-500">Terça e quarta-feira</dt><dd className="mt-1 text-zinc-200">12h às 20h30</dd></div>
              <div><dt className="text-zinc-500">Quinta a sábado</dt><dd className="mt-1 text-zinc-200">12h às 18h</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-purple-400/15 bg-purple-950/20 p-6">
            <p className="text-xs font-medium tracking-[0.22em] text-purple-300 uppercase">Bar</p>
            <dl className="mt-6 space-y-5 text-sm">
              <div><dt className="text-zinc-500">Terça a quinta-feira</dt><dd className="mt-1 text-zinc-200">[confirmar horário]</dd></div>
              <div><dt className="text-zinc-500">Sexta e sábado</dt><dd className="mt-1 text-zinc-200">[confirmar horário]</dd></div>
              <div><dt className="text-zinc-500">Domingo</dt><dd className="mt-1 text-zinc-200">Fechado</dd></div>
            </dl>
          </div>
          <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-medium tracking-[0.22em] text-purple-300 uppercase">Reservas</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">De terça a quinta-feira, consulte a disponibilidade de reservas. Às sextas e aos sábados, o atendimento pode ocorrer por ordem de chegada.</p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
