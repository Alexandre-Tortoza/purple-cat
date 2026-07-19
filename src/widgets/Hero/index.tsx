'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { VinylIntro } from '@/shared/ui/VinylIntro'
import { DURATION, EASE } from '@/shared/lib/animations'

type Phase = 'loading' | 'revealing' | 'joined' | 'settled'

export function Hero() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setPhase('revealing'), 200)
    const joinTimer = window.setTimeout(() => setPhase('joined'), 900)
    const settleTimer = window.setTimeout(() => setPhase('settled'), 1800)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(joinTimer)
      window.clearTimeout(settleTimer)
    }
  }, [])

  return (
    <section id="inicio" className="relative flex min-h-svh items-center bg-[#090710]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_48%,rgba(124,58,237,0.16),transparent_23%),radial-gradient(circle_at_15%_95%,rgba(88,28,135,0.14),transparent_34%)]" />
      <Container className="relative flex min-h-svh items-center overflow-hidden py-24 sm:py-32">
        {phase !== 'loading' && (
          <motion.div
            className="absolute top-1/2 z-10"
            initial={{ left: '50%', x: '-50%', y: '-50%', scale: 0.45, opacity: 0 }}
            animate={
              phase === 'revealing' || phase === 'joined'
                ? { left: '50%', x: '-50%', y: '-50%', scale: 0.8, opacity: 1 }
                : isMobile
                  ? { left: '50%', x: '-50%', y: '-50%', scale: 1.1, opacity: 0.35 }
                  : { left: '75%', x: '-50%', y: '-50%', scale: 1.65, opacity: 1 }
            }
            transition={{
              left: { duration: DURATION.xslow, ease: EASE.standard },
              scale: { duration: DURATION.xslow, ease: EASE.standard },
              opacity: { duration: DURATION.medium, ease: EASE.standard },
            }}
          >
            <VinylIntro
              joined={phase === 'joined' || phase === 'settled'}
              spinning={phase === 'settled'}
              showGlow={phase === 'settled'}
            />
          </motion.div>
        )}

        {/*
          O conteúdo é sempre renderizado no DOM (incluindo no SSR) para que
          o Googlebot indexe o H1 e o texto principal sem depender de JS.
          A visibilidade é controlada por opacity via framer-motion.
        */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={phase === 'settled' ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: DURATION.slow, ease: EASE.standard, delay: 0.45 }}
          className="relative z-20 max-w-2xl"
          aria-hidden={phase !== 'settled' ? true : undefined}
        >
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">
            Listening Bar & Records / Curitiba, Paraná
          </p>
          <h1 className="mt-6 max-w-xl text-5xl leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Aqui, a música não é apenas ambiente.
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
            Bar, música e discos para ouvir com atenção, sem pressa e sem excesso.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#sobre"
              className="inline-flex items-center justify-center rounded-sm bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-purple-400 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(168,85,247,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
            >
              Conheça nossa história
            </a>
            <a
              href="#agenda"
              className="inline-flex items-center justify-center rounded-sm border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-all hover:border-purple-300/50 hover:bg-white/5 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(168,85,247,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
            >
              Ver agenda
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
