'use client'

import { motion, useReducedMotion } from 'motion/react'
import { DURATION, EASE } from '@/shared/lib/animations'

type Props = {
  joined?: boolean
  spinning?: boolean
  showGlow?: boolean
}

export function VinylIntro({ joined = false, spinning = false, showGlow = false }: Props) {
  const shouldReduce = useReducedMotion()
  const rotation = spinning ? 360 : 0

  return (
    <div className="relative" style={{ width: 200, height: 200 }}>
      {showGlow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.xslow, ease: EASE.standard }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              opacity: [0.2, 0.28, 0.24, 0.2],
              scale: [1.8, 1.94, 1.88, 1.8],
              rotate: [0, 360],
              filter: ['blur(46px)', 'blur(52px)', 'blur(48px)', 'blur(46px)'],
            }}
            transition={{
              opacity: { duration: 20, repeat: shouldReduce ? 0 : Infinity, ease: 'easeInOut' },
              scale: { duration: 26, repeat: shouldReduce ? 0 : Infinity, ease: 'easeInOut' },
              rotate: { duration: 120, repeat: shouldReduce ? 0 : Infinity, ease: 'linear' },
              filter: { duration: 30, repeat: shouldReduce ? 0 : Infinity, ease: 'easeInOut' },
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #29113D, #411A61 25%, #973DE0 48%, #5D278A 72%, #29113D)',
              willChange: 'transform, opacity, filter',
            }}
          />
        </motion.div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src="/cat.svg"
          alt=""
          style={{ width: 170, height: 170 }}
          initial={{ opacity: 0, scale: 0.28, x: -76 }}
          animate={{ opacity: 1, scale: 1, x: joined ? 0 : -76, rotate: rotation }}
          transition={{
            opacity: { duration: DURATION.slow, ease: EASE.standard },
            scale: { duration: DURATION.xslow, ease: EASE.standard },
            x: { duration: DURATION.medium, ease: EASE.entrance },
            rotate: { duration: 10, repeat: spinning ? Infinity : 0, ease: 'linear' },
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src="/purple.svg"
          alt=""
          style={{ width: 160, height: 160 }}
          initial={{ opacity: 0, scale: 0.18, x: 76 }}
          animate={{ opacity: 1, scale: 1, x: joined ? 0 : 76, rotate: rotation }}
          transition={{
            opacity: { duration: DURATION.slow, ease: EASE.standard, delay: 0.08 },
            scale: { duration: DURATION.xslow, ease: EASE.standard, delay: 0.08 },
            x: { duration: DURATION.medium, ease: EASE.entrance },
            rotate: { duration: 10, repeat: spinning ? Infinity : 0, ease: 'linear' },
          }}
        />
      </div>
    </div>
  )
}
