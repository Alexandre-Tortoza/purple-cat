'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const LINE_COUNT = 11

function getLineWidth(index: number, progress: number) {
  const activeLine = progress * (LINE_COUNT - 1)
  const distance = Math.abs(index - activeLine)

  return 8 + Math.max(0, 2 - distance) * 9
}

function getScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return maxScroll > 0 ? window.scrollY / maxScroll : 0
}

export function ScrollNavigator() {
  const [progress, setProgress] = useState(0)
  const navigatorRef = useRef<HTMLDivElement>(null)
  const pointerIdRef = useRef<number | null>(null)
  const pointerStartYRef = useRef(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let frame: number | undefined

    const updateProgress = () => {
      if (frame !== undefined) return
      frame = requestAnimationFrame(() => {
        setProgress(getScrollProgress())
        frame = undefined
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      if (frame !== undefined) cancelAnimationFrame(frame)
    }
  }, [])

  function scrollToPointer(clientY: number, smooth: boolean) {
    const bounds = navigatorRef.current?.getBoundingClientRect()
    if (!bounds) return

    const nextProgress = Math.min(1, Math.max(0, (clientY - bounds.top) / bounds.height))
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    setProgress(nextProgress)
    window.scrollTo({
      top: nextProgress * maxScroll,
      behavior: smooth && !reduceMotion ? 'smooth' : 'auto',
    })
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerIdRef.current = event.pointerId
    pointerStartYRef.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return
    if (Math.abs(event.clientY - pointerStartYRef.current) < 2) return

    scrollToPointer(event.clientY, false)
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return

    if (Math.abs(event.clientY - pointerStartYRef.current) < 2) {
      scrollToPointer(event.clientY, true)
    }

    pointerIdRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = 0.05
    let nextProgress: number | null = null

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextProgress = getScrollProgress() - step
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextProgress = getScrollProgress() + step
    if (event.key === 'Home') nextProgress = 0
    if (event.key === 'End') nextProgress = 1
    if (nextProgress === null) return

    event.preventDefault()
    const clampedProgress = Math.min(1, Math.max(0, nextProgress))
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    setProgress(clampedProgress)
    window.scrollTo({
      top: clampedProgress * maxScroll,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <motion.div
      className="fixed top-1/2 left-0 z-30 hidden -translate-y-1/2 sm:block"
      animate={reduceMotion ? undefined : { opacity: [0.225, 0.35, 0.225] }}
      transition={reduceMotion ? undefined : { duration: 6, ease: 'easeInOut', repeat: Infinity }}
    >
      <div
        ref={navigatorRef}
        role="slider"
        tabIndex={0}
        aria-label="Navegação pela página"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuetext={`${Math.round(progress * 100)}% da página`}
        className="flex h-44 w-7 touch-none flex-col items-start justify-between py-1 outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
          {Array.from({ length: LINE_COUNT }, (_, index) => (
            <motion.span
              key={index}
              className="block h-0.5"
              style={{
                backgroundColor: index === Math.round(progress * (LINE_COUNT - 1))
                  ? '#7c3aed'
                  : Math.abs(index - Math.round(progress * (LINE_COUNT - 1))) === 1
                    ? '#8b6aa9'
                    : Math.abs(index - Math.round(progress * (LINE_COUNT - 1))) === 2
                      ? '#6a5c75'
                      : '#52525b',
              }}
              animate={{ width: getLineWidth(index, progress) }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
          />
        ))}
      </div>
    </motion.div>
  )
}
