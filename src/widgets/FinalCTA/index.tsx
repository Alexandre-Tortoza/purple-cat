import { Container } from '@/shared/ui/Container'
import { SITE } from '@/shared/config/site'

export function FinalCTA() {
  return (
    <section className="bg-[#090710] py-28 sm:py-36">
      <Container className="text-center">
        <p className="text-xs font-medium tracking-[0.26em] text-purple-300 uppercase">Purple Cat / Curitiba</p>
        <h2 className="mx-auto mt-6 max-w-4xl text-5xl leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl">Escolha um disco. Peça um drink. Ouça com atenção.</h2>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">Descubra uma forma diferente de viver a música no centro de Curitiba.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={SITE.mapUrl} className="inline-flex rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400">Como chegar</a>
          <a href="#agenda" className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-purple-300/50 hover:bg-white/5">Ver agenda</a>
        </div>
      </Container>
    </section>
  )
}
