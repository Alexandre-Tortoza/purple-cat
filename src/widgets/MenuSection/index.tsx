'use client'

import { useState } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { VinylDisc } from '@/shared/ui/VinylDisc'
import { MENU_A, MENU_B } from '@/shared/config/site'
import { EASE } from '@/shared/lib/animations'
import { ScrollStackContent } from '@/shared/ui/ScrollStackCard'

const CARD_W = 460
const CARD_H = 460
const DISC_SIZE = 320

type Side = 'A' | 'B'

// Rings positioned in parent coordinate space.
// left: CARD_W - DISC_SIZE/2 = 300 → element center = 300 + 160 = 460 = disc center.
// scale expands from element center, keeping waves centered on the disc.
// Card (z-10) covers the left half of each wave; right half expands visibly.
function SoundWaves({ active }: { active: boolean }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full border border-purple-400/40"
          style={{
            width: DISC_SIZE,
            height: DISC_SIZE,
            left: CARD_W - DISC_SIZE / 2,
            top: '50%',
            y: '-50%',
            zIndex: 0,
          }}
          animate={active ? { scale: [1, 2.4], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
          transition={{
            duration: 4,
            delay: i * 1.1,
            repeat: Infinity,
            repeatDelay: 0.4,
            ease: [0.2, 0.6, 0.4, 1],
          }}
        />
      ))}
    </>
  )
}

export function MenuSection() {
  const [side, setSide] = useState<Side>('A')
  const [activeTab, setActiveTab] = useState<Side>('A')
  const [isFlipping, setIsFlipping] = useState(false)
  const [isSpinning, setIsSpinning] = useState(true)
  const [rotationY, setRotationY] = useState(0)
  const discControls = useAnimationControls()

  async function handleFlip() {
    if (isFlipping) return
    const target: Side = side === 'A' ? 'B' : 'A'
    setIsFlipping(true)

    // ① Slide indicator + recua disco — disco ainda girando e visível
    setActiveTab(target)
    await discControls.start({
      x: -(CARD_W / 2),
      transition: { duration: 0.35, ease: EASE.entrance },
    })

    // ② Disco está atrás do card → esconde + para rotação (usuário não vê)
    void discControls.start({ opacity: 0, transition: { duration: 0 } })
    setIsSpinning(false)

    // ③ Flip do card
    setRotationY((r) => r + 180)
    setSide(target)
    await new Promise((r) => setTimeout(r, 520))

    // ④ Retoma rotação + mostra disco antes de emergir
    setIsSpinning(true)
    void discControls.start({ opacity: 1, transition: { duration: 0 } })

    // ⑤ Emerge suave
    await discControls.start({
      x: 0,
      transition: { duration: 0.45, ease: EASE.entrance },
    })

    setIsFlipping(false)
  }

  return (
    <section
      id="cardapio"
      className="border-y border-purple-900/20 bg-[#0d0917] py-16 sm:py-24 lg:py-32"
    >
      <ScrollStackContent>
        <div className="mx-auto w-full px-6">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Cardápio</p>
            <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Drinks para acompanhar a experiência</h2>
          </div>

          {/* Mobile — só o flip card, sem disco */}
          <div className="mt-10 sm:hidden">
            <div style={{ position: 'relative', height: CARD_H, perspective: 1000 }}>
              <motion.div
                animate={{ rotateY: rotationY }}
                transition={{ duration: 0.52, ease: EASE.entrance }}
                style={{ width: '100%', height: CARD_H, transformStyle: 'preserve-3d', position: 'relative' }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-purple-800/40 bg-[#0a0618]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <CardFace side="A" activeTab={activeTab} onFlip={handleFlip} isFlipping={isFlipping} />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-stone-200/60 bg-[#f5f0eb]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <CardFace side="B" activeTab={activeTab} onFlip={handleFlip} isFlipping={isFlipping} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop — card + disco lado a lado */}
          <div
            className="relative mx-auto mt-14 translate-x-20 hidden sm:block"
            style={{ width: CARD_W + DISC_SIZE / 2, height: CARD_H }}
          >
            <SoundWaves active={!isFlipping} />

            {/* Disco — metade para fora à direita */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 0,
              }}
            >
              <motion.div animate={discControls} style={{ x: 0 }}>
                <VinylDisc size={DISC_SIZE} spinning={isSpinning} />
              </motion.div>
            </div>

            {/* Card — na frente do disco */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                perspective: 1000,
                width: CARD_W,
                height: CARD_H,
              }}
            >
              <motion.div
                animate={{ rotateY: rotationY }}
                transition={{ duration: 0.52, ease: EASE.entrance }}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                }}
              >
                {/* Frente — Lado A */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-purple-800/40 bg-[#0a0618]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <CardFace
                    side="A"
                    activeTab={activeTab}
                    onFlip={handleFlip}
                    isFlipping={isFlipping}
                  />
                </div>

                {/* Verso — Lado B */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-stone-200/60 bg-[#f5f0eb]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <CardFace
                    side="B"
                    activeTab={activeTab}
                    onFlip={handleFlip}
                    isFlipping={isFlipping}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollStackContent>
    </section>
  )
}

type CardFaceProps = {
  side: Side
  activeTab: Side
  onFlip: () => void
  isFlipping: boolean
}

const THEME = {
  A: {
    name: 'text-purple-100',
    desc: 'text-purple-300/60',
    divider: 'border-purple-900/40',
    activeLabel: '#c084fc',
    inactiveLabel: 'rgba(255,255,255,0.35)',
    underlineBase: 'bg-white/25',
  },
  B: {
    name: 'text-stone-800',
    desc: 'text-stone-500',
    divider: 'border-stone-200',
    activeLabel: '#7c3aed',
    inactiveLabel: 'rgba(0,0,0,0.35)',
    underlineBase: 'bg-black/12',
  },
} as const

function CardFace({ side, activeTab, onFlip, isFlipping }: CardFaceProps) {
  const items = side === 'A' ? MENU_A : MENU_B
  const t = THEME[side]

  return (
    <div className="flex h-full flex-col p-8">
      {/* Header: Lado A | Lado B + underline deslizante */}
      <div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => activeTab !== 'A' && onFlip()}
            disabled={isFlipping || activeTab === 'A'}
            className="disabled:cursor-default"
          >
            <motion.span
              animate={{ color: activeTab === 'A' ? t.activeLabel : t.inactiveLabel }}
              transition={{ duration: 0.35, ease: EASE.entrance }}
              className="text-xs font-medium tracking-[0.22em] uppercase"
            >
              Lado A
            </motion.span>
          </button>
          <button
            onClick={() => activeTab !== 'B' && onFlip()}
            disabled={isFlipping || activeTab === 'B'}
            className="disabled:cursor-default"
          >
            <motion.span
              animate={{ color: activeTab === 'B' ? t.activeLabel : t.inactiveLabel }}
              transition={{ duration: 0.35, ease: EASE.entrance }}
              className="text-xs font-medium tracking-[0.22em] uppercase"
            >
              Lado B
            </motion.span>
          </button>
        </div>

        {/* Underline deslizante */}
        <div className={`relative mt-5 h-px w-full ${t.underlineBase}`}>
          <motion.div
            className="absolute left-0 top-0 h-full bg-purple-400"
            initial={false}
            animate={{ x: activeTab === 'A' ? '0%' : '100%' }}
            transition={{ duration: 0.35, ease: EASE.entrance }}
            style={{ width: '50%' }}
          />
        </div>
      </div>

      {/* Lista de drinks com scrollbar */}
      <div
        data-lenis-prevent
        className={`mt-4 flex-1 overflow-y-auto pr-2
          [scrollbar-width:thin]
          [scrollbar-color:#000_transparent]
          [&::-webkit-scrollbar]:w-[5px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-black`}
      >
        {items.map((item, index) => (
          <div key={item.name} className={`flex gap-4 border-b py-4 last:border-0 ${t.divider}`}>
            <span className={`font-heading text-xl leading-tight ${side === 'A' ? 'text-purple-400/70' : 'text-purple-700/70'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h4 className={`font-heading text-2xl leading-tight ${t.name}`}>{item.name}</h4>
              <p className={`mt-1 text-sm leading-relaxed ${t.desc}`}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
