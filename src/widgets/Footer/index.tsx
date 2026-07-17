import { Container } from '@/shared/ui/Container'
import { SITE } from '@/shared/config/site'

export function Footer() {
  return (
    <footer className="border-t border-purple-900/20 bg-[#090710]">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <nav className="flex gap-6">
          <a href="#" className="transition-colors hover:text-purple-400">Privacy</a>
          <a href="#" className="transition-colors hover:text-purple-400">Terms</a>
          <a href="#" className="transition-colors hover:text-purple-400">Contact</a>
        </nav>
      </Container>
    </footer>
  )
}
