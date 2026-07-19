'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  isLast?: boolean
}

export function ScrollStackCard({ children, isLast }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    // Animate only while this section leaves the viewport, not while its content is read.
    offset: ['end end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['0px', '20px'])

  return (
    <div ref={ref}>
      <motion.div
        style={
          isLast
            ? { overflow: 'hidden' }
            : { scale, opacity, borderRadius, overflow: 'hidden' }
        }
      >
        {children}
      </motion.div>
    </div>
  )
}
