'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useMenu } from '@/features/ToggleMenu'
import { CloseIcon } from '@/shared/ui/icons'
import { NAV_ITEMS, SITE } from '@/shared/config/site'

export function Menu() {
  const { isOpen, close } = useMenu()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-purple-900/30 bg-[#0d0518] p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-purple-400">{SITE.name}</span>
              <button onClick={close} className="rounded-full p-1 hover:bg-purple-950" aria-label="Close menu">
                <CloseIcon />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="text-lg font-medium text-zinc-300 transition-colors hover:text-purple-400"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
