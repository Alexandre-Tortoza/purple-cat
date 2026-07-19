import { Container } from '@/shared/ui/Container'
import { NAV_ITEMS, SITE } from '@/shared/config/site'

export function Footer() {
  return (
    <footer className="border-t border-purple-900/20 bg-[#0d0917] pb-24 pt-14 sm:pb-28">
      <Container>
        <div className="grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr]">
          <div>
            <a href="#inicio" className="font-heading text-3xl text-white">{SITE.name}<span className="text-purple-400">.</span></a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">Música, drinks, cozinha e discos de vinil em Curitiba.</p>
            <address className="mt-6 not-italic text-sm leading-relaxed text-zinc-400">{SITE.address}<br />{SITE.neighborhood}</address>
          </div>
          <nav aria-label="Navegação do rodapé" className="flex flex-col items-start gap-3 text-sm">
            {NAV_ITEMS.slice(2).map((item) => <a key={item.href} href={item.href} className="text-zinc-400 transition-colors hover:text-purple-300">{item.label}</a>)}
            <a href={SITE.instagramUrl} className="text-zinc-400 transition-colors hover:text-purple-300">Instagram</a>
          </nav>
          <nav aria-label="Links institucionais" className="flex flex-col items-start gap-3 text-sm">
            <a href="#newsletter" className="text-zinc-400 transition-colors hover:text-purple-300">Contato</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-purple-300">Política de privacidade</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-purple-300">Termos de uso</a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-zinc-600 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Purple Cat. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{' '}
            <a
              href="https://alexandre-trotoza.tech"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-purple-300"
            >
              Alexandre Tortoza
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  )
}
