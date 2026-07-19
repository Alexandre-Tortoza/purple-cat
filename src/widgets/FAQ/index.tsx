import { Container } from '@/shared/ui/Container'
import { FAQS } from '@/shared/config/site'

export function FAQ() {
  return (
    <section id="informacoes" className="bg-[#090710] py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Informações úteis</p>
          <h2 className="mt-5 text-4xl leading-none tracking-tight text-white sm:text-5xl">Antes de visitar</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg text-zinc-100 marker:content-none">
                {item.question}
                <span className="text-xl text-purple-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-2xl pt-4 leading-relaxed text-zinc-500">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
