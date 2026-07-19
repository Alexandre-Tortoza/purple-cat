import { Container } from '@/shared/ui/Container'
import { ScrollStackContent } from '@/shared/ui/ScrollStackCard'

export function Manifesto() {
  return (
    <section className="overflow-hidden bg-purple-500 py-16 text-[#160927] sm:py-24 lg:py-32">
      <ScrollStackContent>
      <Container>
        <p className="text-xs font-bold tracking-[0.26em] uppercase">Manifesto</p>
        <div className="mt-8 max-w-4xl">
          <h2 className="font-heading text-5xl leading-[0.94] sm:text-6xl lg:text-7xl">Ouvir também é uma forma de estar presente.</h2>
          <div className="mt-12 max-w-2xl space-y-5 text-lg leading-relaxed text-purple-950">
            <p>Em um mundo acelerado, escolhemos diminuir o ritmo.</p>
            <p>Colocar um disco. Preparar um drink. Sentar. Escutar.</p>
            <p>Acreditamos na música como ponto de encontro, na curadoria como forma de cuidado e na hospitalidade como parte da experiência.</p>
            <p>O Purple Cat existe para quem ainda encontra valor nos detalhes.</p>
          </div>
        </div>
      </Container>
      </ScrollStackContent>
    </section>
  )
}
