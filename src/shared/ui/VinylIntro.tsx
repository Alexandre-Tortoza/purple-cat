'use client'

import { motion } from 'motion/react'

type Props = {
  spinning?: boolean
  overlap?: boolean
}

export function VinylIntro({ spinning = false, overlap = false }: Props) {
  const rot = spinning ? 360 : 0
  const dur = spinning ? 8 : 0
  const inf = spinning ? Infinity : 0

  return (
    <div className="relative" style={{ width: 200, height: 200 }}>
      {/* Glow — 3 camadas com diferentes cores, blur e densidade */}
      {overlap && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.45, scale: 1.3 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 48% 52%, #973DE0 0%, #411A61 35%, #973DE0 55%, transparent 75%)',
              filter: 'blur(10px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.35, scale: 1.8 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 52% 48%, #411A61 0%, #29113D 40%, #973DE0 65%, transparent 85%)',
              filter: 'blur(25px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.25, scale: 2.5 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, #29113D 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </>
      )}

      {/* cat.svg — disco base (começa à esquerda) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src="/cat.svg"
          alt=""
          style={{ width: 170, height: 170 }}
          initial={{ scale: 0.15 }}
          animate={{
            scale: 1,
            x: overlap ? 0 : -95,
            rotate: rot,
          }}
          transition={{
            scale: { duration: 1.5, ease: [0.65, 0, 0.35, 1] },
            x: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
            rotate: { duration: dur, repeat: inf, ease: 'linear' },
          }}
        />
      </div>

      {/* purple.svg — selo central (começa à direita) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src="/purple.svg"
          alt=""
          style={{ width: 160, height: 160 }}
          initial={{ scale: 0.15 }}
          animate={{
            scale: 1,
            x: overlap ? 0 : 95,
            rotate: rot,
          }}
          transition={{
            scale: { duration: 1.5, ease: [0.65, 0, 0.35, 1] },
            x: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
            rotate: { duration: dur, repeat: inf, ease: 'linear' },
          }}
        />
      </div>
    </div>
  )
}
