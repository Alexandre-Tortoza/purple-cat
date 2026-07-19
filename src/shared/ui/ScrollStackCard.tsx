'use client'

import { createContext, useContext, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import type { ReactNode } from 'react'

type Ctx = { scale: MotionValue<number>; opacity: MotionValue<number> } | null
const ScrollStackCtx = createContext<Ctx>(null)

type Props = { children: ReactNode; isLast?: boolean }

export function ScrollStackCard({ children, isLast }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <ScrollStackCtx.Provider value={isLast ? null : { scale, opacity }}>
      <div ref={ref}>{children}</div>
    </ScrollStackCtx.Provider>
  )
}

export function ScrollStackContent({ children }: { children: ReactNode }) {
  const ctx = useContext(ScrollStackCtx)
  if (!ctx) return <>{children}</>
  return (
    <motion.div className="w-full" style={{ scale: ctx.scale, opacity: ctx.opacity }}>
      {children}
    </motion.div>
  )
}
