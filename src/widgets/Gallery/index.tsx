'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Container } from '@/shared/ui/Container'
import { GALLERY_ITEMS, SITE } from '@/shared/config/site'
import { ScrollStackContent } from '@/shared/ui/ScrollStackCard'

const layouts = ['sm:col-span-2 sm:row-span-2', '', '', 'sm:col-span-2', '', '']

export function Gallery() {
  return (
    <section id="galeria" className="bg-[#0d0917] py-16 sm:py-24 lg:py-32">
      <ScrollStackContent>
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Galeria</p>
            <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Entre, escolha um lugar e fique um pouco</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">Música, drinks, discos e encontros em um espaço pensado para ser vivido sem pressa.</p>
          </div>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-purple-200 transition-colors hover:text-purple-100"
          >
            Ver mais no Instagram <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="mt-14 grid auto-rows-[180px] gap-3 sm:grid-cols-4 sm:auto-rows-[150px]">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.figure
              key={item.caption}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#171022] ${layouts[index]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                priority={index === 0}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090710] via-[#090710]/65 to-transparent p-5 pt-16">
                <figcaption className="max-w-xs text-sm leading-relaxed text-zinc-300">{item.caption}</figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </Container>
      </ScrollStackContent>
    </section>
  )
}
