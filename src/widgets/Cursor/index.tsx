'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function Cursor() {
  const [visible, setVisible] = useState(false)
  const [idle, setIdle] = useState(true)
  const idleRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  const trailX = useSpring(mouseX, { stiffness: 80, damping: 16 })
  const trailY = useSpring(mouseY, { stiffness: 80, damping: 16 })

  useEffect(() => {
    const startIdleTimer = () => {
      if (idleRef.current) clearTimeout(idleRef.current)
      idleRef.current = setTimeout(() => setIdle(true), 2000)
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
      setIdle(false)
      startIdleTimer()
    }

    const onLeave = () => setVisible(false)

    const onEnter = () => {
      setVisible(true)
      setIdle(false)
      startIdleTimer()
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (idleRef.current) clearTimeout(idleRef.current)
    }
  }, [mouseX, mouseY])

  const isActive = visible && !idle

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-10 w-10 rounded-full border border-white" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
      </motion.div>
    </>
  )
}
