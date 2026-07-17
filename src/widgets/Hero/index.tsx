'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { VinylIntro } from '@/shared/ui/VinylIntro'
import { Button } from '@/shared/ui/Button'

type Phase = 'loading' | 'vinyl' | 'settled'

export function Hero() {
  const [phase, setPhase] = useState<Phase>('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('vinyl'), 500)
    const t2 = setTimeout(() => setPhase('settled'), 2200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090710] px-6">
      <div className="relative flex w-full max-w-[1280px] flex-col items-center justify-center">
        {/* Vinil — centro → direita */}
        <motion.div
          className="absolute z-10"
          initial={{ left: '50%', top: '45%', x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
          animate={
            phase === 'loading'
              ? { scale: 0, opacity: 0 }
              : phase === 'vinyl'
                ? { scale: 1, left: '50%', top: '45%', x: '-50%', y: '-50%', opacity: 1 }
                : {
                    scale: 1,
                    left: '50%',
                    top: '30%',
                    x: '-50%',
                    y: '-50%',
                    opacity: 1,
                  }
          }
          transition={{
            scale: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
            x: { duration: 1.8, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.6 },
          }}
        >
          <VinylIntro spinning={phase === 'settled'} overlap={phase === 'settled'} />
        </motion.div>

        {/* Texto — fade/slide da esquerda */}
        <AnimatePresence>
          {phase === 'settled' && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
              className="relative z-20 max-w-xl text-center"
            >
              <span className="mb-2 inline-block rounded-full border border-purple-500/30 bg-purple-950/50 px-4 py-1 text-xs font-medium tracking-wide text-purple-300">
                Since 2024
              </span>

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                  Purple Cat
                </span>
              </h1>

              <p className="mt-2 text-lg text-white sm:text-xl">
                Listening bar & records
              </p>

              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
                &ldquo;Onde o jazz encontra o mistério. Vinil, espírito e noites
                inesquecíveis no coração da cidade.&rdquo;
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                &mdash; by PLACEHOLDER NAME
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button variant="primary">Explorar</Button>
                <Button variant="ghost">Agenda</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
