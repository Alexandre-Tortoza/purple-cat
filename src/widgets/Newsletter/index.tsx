'use client'

import { FormEvent, useState } from 'react'
import { Container } from '@/shared/ui/Container'

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="border-y border-purple-400/20 bg-purple-950/30 py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
        <div>
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Newsletter</p>
          <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Receba a agenda do Purple Cat</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">Audições, lançamentos, novidades da loja e atualizações do cardápio diretamente no seu e-mail.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
          <label className="sr-only" htmlFor="name">Seu nome</label>
          <input id="name" name="name" required placeholder="Seu nome" className="h-12 rounded-xl border border-white/10 bg-[#090710] px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-purple-300" />
          <label className="sr-only" htmlFor="email">Seu melhor e-mail</label>
          <input id="email" name="email" type="email" required placeholder="Seu melhor e-mail" className="h-12 rounded-xl border border-white/10 bg-[#090710] px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-purple-300" />
          <button type="submit" className="h-12 rounded-xl bg-purple-500 px-6 text-sm font-medium text-white transition-colors hover:bg-purple-400 sm:w-max">Quero receber novidades</button>
          <p className="self-center text-xs leading-relaxed text-zinc-500">{submitted ? 'Cadastro registrado nesta demonstração. A integração de e-mail ainda será configurada.' : 'Ao se cadastrar, você concorda em receber comunicações do Purple Cat. O cancelamento pode ser feito a qualquer momento.'}</p>
        </form>
      </Container>
    </section>
  )
}
