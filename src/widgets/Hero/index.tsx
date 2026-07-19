'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { VinylIntro } from '@/shared/ui/VinylIntro'
import { DURATION, EASE } from '@/shared/lib/animations'

type Phase = 'loading' | 'revealing' | 'joined' | 'settled'

export function Hero() {
  const [phase, setPhase] = useState<Phase>('loading')

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setPhase('revealing'), 300)
    const joinTimer = window.setTimeout(() => setPhase('joined'), 1700)
    const settleTimer = window.setTimeout(() => setPhase('settled'), 2750)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(joinTimer)
      window.clearTimeout(settleTimer)
    }
  }, [])

  return (
    <section id="inicio" className="relative flex min-h-svh items-center overflow-hidden bg-[#090710]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_48%,rgba(124,58,237,0.16),transparent_23%),radial-gradient(circle_at_15%_95%,rgba(88,28,135,0.14),transparent_34%)]" />
      <Container className="relative flex min-h-svh items-center py-32">
        {phase !== 'loading' && (
          <motion.div
            className="absolute top-1/2 z-10 hidden sm:block"
            initial={{ left: '50%', x: '-50%', y: '-50%', scale: 0.45, opacity: 0 }}
            animate={
              phase === 'revealing' || phase === 'joined'
                ? { left: '50%', x: '-50%', y: '-50%', scale: 0.8, opacity: 1 }
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

        <AnimatePresence>
          {phase === 'settled' && (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: DURATION.slow, ease: EASE.standard, delay: 0.45 }}
              className="relative z-20 max-w-2xl"
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
                  className="inline-flex items-center justify-center rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                >
                  Conheça nossa história
                </a>
                <a
                  href="#agenda"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-purple-300/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                >
                  Ver agenda
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  )
}
