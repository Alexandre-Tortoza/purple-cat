import { motion } from 'motion/react'

type Props = {
  spinning?: boolean
  size?: number
}

export function VinylDisc({ spinning = false, size = 320 }: Props) {
  const center = size / 2

  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      animate={spinning ? { rotate: 360 } : { rotate: 0 }}
      transition={
        spinning
          ? { duration: 8, repeat: Infinity, ease: 'linear' }
          : { duration: 0.6, ease: 'easeOut' }
      }
    >
      {/* Disco principal — gradiente roxo com textura de vinil */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(
              circle at ${center}px ${center}px,
              #1a0a2e 0%,
              #2d0a5e 20%,
              #3b0d7a 40%,
              #4a0d8a 55%,
              #2d0a5e 70%,
              #1a0a2e 85%,
              #0d0518 100%
            )
          `,
          boxShadow: `
            inset 0 0 40px rgba(0,0,0,0.6),
            0 0 60px rgba(124,58,237,0.3)
          `,
        }}
      >
        {/* Sulcos do vinil — anéis concêntricos */}
        {[0.78, 0.68, 0.58, 0.48].map((r) => (
          <div
            key={r}
            className="absolute left-1/2 top-1/2 rounded-full border border-purple-500/15"
            style={{
              width: size * r,
              height: size * r,
              marginLeft: -(size * r) / 2,
              marginTop: -(size * r) / 2,
            }}
          />
        ))}
      </div>

      {/* Selo central */}
      <div
        className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-purple-700"
        style={{
          width: size * 0.26,
          height: size * 0.26,
          marginLeft: -(size * 0.26) / 2,
          marginTop: -(size * 0.26) / 2,
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <span
          className="text-center font-bold tracking-tight text-purple-200"
          style={{ fontSize: size * 0.045 }}
        >
          PC
        </span>
      </div>

      {/* Furo central */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full bg-[#090710]"
        style={{
          width: size * 0.06,
          height: size * 0.06,
          marginLeft: -(size * 0.06) / 2,
          marginTop: -(size * 0.06) / 2,
        }}
      />
    </motion.div>
  )
}
