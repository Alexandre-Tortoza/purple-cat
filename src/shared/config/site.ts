export const SITE = {
  name: 'Purple Cat',
  description: 'Listening bar, drinks, cozinha e discos de vinil em Curitiba.',
  url: 'https://purplecat.app',
  address: 'Alameda Dr. Carlos de Carvalho, 695',
  neighborhood: 'Centro, Curitiba, Paraná',
  zipCode: 'CEP 80430-180',
  mapUrl: '#visite',
  instagramUrl: '#galeria',
  reservationUrl: '#visite',
  recordsUrl: '#discos',
} as const

export const NAV_ITEMS = [
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Experiência', href: '/#experiencia' },
  { label: 'Agenda', href: '/#agenda' },
  { label: 'Cardápio', href: '/#cardapio' },
  { label: 'Discos', href: '/#discos' },
  { label: 'Visite', href: '/#visite' },
] as const

export const EXPERIENCES = [
  {
    number: '01',
    title: 'Listening Bar',
    description:
      'Discos selecionados, audições especiais e uma programação criada para quem gosta de realmente ouvir música.',
    detail:
      'Cada sessão é uma oportunidade de descobrir novos artistas, revisitar clássicos e perceber detalhes que normalmente passam despercebidos.',
  },
  {
    number: '02',
    title: 'Bar e cozinha',
    description:
      'Drinks autorais, clássicos cuidadosamente preparados e uma cozinha de inspiração japonesa.',
    detail:
      'Sabores equilibrados, ingredientes selecionados e um cardápio pensado para acompanhar a experiência musical.',
  },
  {
    number: '03',
    title: 'Records',
    description:
      'Uma seleção de discos de vinil para ouvir, descobrir e levar para casa.',
    detail:
      'Novidades, lançamentos, clássicos e escolhas feitas pela equipe para diferentes momentos e estilos.',
  },
] as const

export const EVENTS = [
  {
    type: 'Audição compartilhada',
    name: '[Nome do álbum ou artista]',
    description: 'Uma sessão dedicada à escuta completa do álbum, em vinil e com atenção a cada detalhe.',
    date: '[dia e mês]',
    time: '[horário]',
    admission: '[gratuita, reserva ou valor]',
  },
  {
    type: 'Sessão especial',
    name: '[Nome do evento]',
    description: 'Uma noite de curadoria musical, drinks e descobertas.',
    date: '[dia e mês]',
    time: '[horário]',
    admission: '[informação]',
  },
  {
    type: 'Lançamento',
    name: '[Nome do artista ou projeto]',
    description: 'Audição especial e encontro com artistas, selos ou projetos independentes.',
    date: '[dia e mês]',
    time: '[horário]',
    admission: '[informação]',
  },
] as const

export const MENU_A = [
  { name: 'Purple Cat', description: '[gin, licor de violeta, limão, clara de ovo]' },
  { name: 'Lado A', description: '[mezcal, aperol, maracujá, pimenta]' },
  { name: 'Vinil Sour', description: '[bourbon, limão siciliano, mel, angostura]' },
  { name: 'Groove', description: '[cachaça envelhecida, gengibre, tangerina, espuma de ervas]' },
] as const

export const MENU_B = [
  { name: 'Lado B', description: '[vodka, creme de coco, espresso, baunilha]' },
  { name: 'Ato Final', description: '[rum escuro, amaro, laranja, canela]' },
  { name: 'Noite Dupla', description: '[whisky japonês, sakura, mel de flor laranjeira]' },
  { name: 'Deep Cut', description: '[gim, vermouth seco, elderflower, pepino]' },
] as const

export const RECORD_COLLECTIONS = [
  { title: 'Novidades da semana', description: 'Novos títulos e reposições selecionadas pela equipe.' },
  { title: 'Escolhas da casa', description: 'Discos que estão tocando no bar e fazem parte da nossa curadoria.' },
  { title: 'Lançamentos independentes', description: 'Artistas, selos e projetos que ajudam a movimentar a cena musical.' },
] as const

export const GALLERY_ITEMS = [
  'O sistema de som e a experiência de escuta.',
  'Discos selecionados pela equipe.',
  'Drinks preparados no balcão.',
  'Sessões de audição compartilhada.',
  'Detalhes do espaço.',
  'Noites no Purple Cat.',
] as const

export const FAQS = [
  { question: 'Precisa reservar?', answer: 'As regras podem variar conforme o dia e a programação. Consulte nossa equipe antes da visita.' },
  { question: 'Posso comprar discos durante a noite?', answer: 'A disponibilidade da loja fora do horário regular deve ser confirmada com a equipe.' },
  { question: 'Existem opções sem álcool?', answer: 'Sim. O cardápio pode incluir drinks sem álcool e outras bebidas.' },
  { question: 'Existem opções vegetarianas?', answer: 'Consulte o cardápio atualizado ou fale com a equipe sobre restrições alimentares.' },
  { question: 'O Purple Cat realiza eventos?', answer: 'O espaço possui uma programação própria de audições, lançamentos e sessões especiais.' },
  { question: 'Posso propor uma parceria ou evento?', answer: 'Artistas, selos, curadores e projetos culturais podem entrar em contato para apresentar propostas.' },
] as const
