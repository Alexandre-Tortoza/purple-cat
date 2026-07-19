import { Container } from '@/shared/ui/Container'
import { SITE } from '@/shared/config/site'
import { ScrollStackContent } from '@/shared/ui/ScrollStackCard'

export function FinalCTA() {
  return (
    <section className="bg-[#090710] py-16 sm:py-28 lg:py-36">
      <ScrollStackContent>
      <Container className="text-center">
        <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Purple Cat / Curitiba</p>
        <h2 className="mx-auto mt-6 max-w-4xl text-5xl leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl">Escolha um disco. Peça um drink. Ouça com atenção.</h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">Descubra uma forma diferente de viver a música no centro de Curitiba.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={SITE.mapUrl} className="inline-flex rounded-sm bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-purple-400 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(168,85,247,0.4)]">Como chegar</a>
          <a href="#agenda" className="inline-flex rounded-sm border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-all hover:border-purple-300/50 hover:bg-white/5 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(168,85,247,0.4)]">Ver agenda</a>
        </div>
      </Container>
      </ScrollStackContent>
    </section>
  )
}
