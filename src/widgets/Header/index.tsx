'use client'

import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/shared/ui/Container'
import { BAR_HOURS, NAV_ITEMS, SITE, STORE_HOURS } from '@/shared/config/site'
import { useMenu } from '@/features/ToggleMenu'
import { useAppAnimation } from '@/features/AppAnimation'
import { MenuIcon } from '@/shared/ui/icons'
import { TRANSITION_SLIDE_IN } from '@/shared/lib/animations'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function isOpenNow(date: Date): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))
  const currentDay = values.weekday
  const currentMinutes = Number(values.hour) * 60 + Number(values.minute)
  const previousDay = WEEKDAYS[(WEEKDAYS.indexOf(currentDay) + WEEKDAYS.length - 1) % WEEKDAYS.length]

  return [...BAR_HOURS, ...STORE_HOURS].some(({ dayOfWeek, opens, closes }) => {
    const openingMinutes = timeToMinutes(opens)
    const closingMinutes = timeToMinutes(closes)

    if (closingMinutes > openingMinutes) {
      return dayOfWeek === currentDay && currentMinutes >= openingMinutes && currentMinutes < closingMinutes
    }

    return (dayOfWeek === currentDay && currentMinutes >= openingMinutes)
      || (dayOfWeek === previousDay && currentMinutes < closingMinutes)
  })
}

function OpeningStatus({ isOpen }: { isOpen: boolean }) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center gap-1 text-xs font-normal text-zinc-500">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${isOpen ? 'animate-pulse bg-emerald-400 motion-reduce:animate-none' : 'bg-red-500'}`}
      />
      {isOpen ? 'Aberto' : 'Fechado'}
    </span>
  )
}

export function Header() {
  const { toggle } = useMenu()
  const { phase } = useAppAnimation()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20)
  })

  useEffect(() => {
    const updateStatus = () => setIsOpen(isOpenNow(new Date()))

    updateStatus()
    const interval = window.setInterval(updateStatus, 60_000)
    return () => window.clearInterval(interval)
  }, [])

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

        <div className="flex items-center">
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
          <div className="ml-4">
            <OpeningStatus isOpen={isOpen} />
          </div>
          <button
            type="button"
            onClick={toggle}
            className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-purple-950/50 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 lg:hidden"
            aria-label="Abrir menu"
          >
            <MenuIcon />
          </button>
        </div>
      </Container>
    </motion.header>
  )
}
