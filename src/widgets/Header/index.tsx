'use client'

import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/shared/ui/Container'
import { NAV_ITEMS, SITE } from '@/shared/config/site'
import { useMenu } from '@/features/ToggleMenu'
import { useAppAnimation } from '@/features/AppAnimation'
import { MenuIcon } from '@/shared/ui/icons'
import { TRANSITION_SLIDE_IN } from '@/shared/lib/animations'

export function Header() {
  const { toggle } = useMenu()
  const { phase } = useAppAnimation()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20)
  })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={phase === 'ready' ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={TRANSITION_SLIDE_IN}
      style={{
        height: isScrolled ? '52px' : '64px',
        backgroundColor: isScrolled ? 'rgba(9, 7, 16, 0.8)' : 'rgba(9, 7, 16, 0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        borderBottom: isScrolled
          ? '1px solid rgba(124, 45, 173, 0.2)'
          : '1px solid rgba(124, 45, 173, 0)',
      }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center transition-all duration-700 ease-out"
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="font-heading text-xl tracking-tight text-white">
          {SITE.name}<span className="text-purple-400">.</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-purple-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-purple-950/50 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 lg:hidden"
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </button>
      </Container>
    </motion.header>
  )
}
