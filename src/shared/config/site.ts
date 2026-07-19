// ─── Dados não confirmados — não publicar como valores reais ──────────────────
export const BUSINESS_PHONE = null as null         // ❌ não confirmado

// ─── Coordenadas geográficas — fonte: Google Maps (Google Business Profile) ───
export const BUSINESS_LATITUDE = -25.433874
export const BUSINESS_LONGITUDE = -49.281592

// ─── Identidade ───────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Purple Cat',
  fullName: 'Purple Cat Listening Bar & Records',
  alternateName: 'Purple Cat',
  description: 'Listening bar, drinks, cozinha e discos de vinil em Curitiba.',
  url: 'https://purplecat.app',
  email: 'purple.cat.bar@gmail.com',

  // ─── Endereço ───────────────────────────────────────────────────────────────
  address: 'Alameda Dr. Carlos de Carvalho, 695',
  neighborhood: 'Centro, Curitiba, Paraná',
  zipCode: 'CEP 80430-180',

  // ─── Links externos ─────────────────────────────────────────────────────────
  // Fonte: Instagram oficial @purplecat.bar.records
  instagramUrl: 'https://www.instagram.com/purplecat.bar.records/',
  // URL do Google Maps — parâmetros de rastreamento removidos; inclui CID do local
  mapUrl: 'https://www.google.com/maps/place/Purple+Cat+listening+bar+%26+records/@-25.433874,-49.281592,17z/data=!4m6!3m5!1s0x94dce58bea3f8fdf:0xffb6744850127c4d!8m2!3d-25.433874!4d-49.281592!16s%2Fg%2F11x8xbd2r6',
  reservationUrl: '#visite',
  recordsUrl: '#discos',
} as const

// ─── Horários da loja de discos ───────────────────────────────────────────────
// Fonte: Instagram oficial — horário de quarta-feira publicado como 12h-20h30
// ⚠️ PENDÊNCIA: divergência entre Instagram e Google Business para quarta-feira
//    Confirmar com o Purple Cat antes de publicar como definitivo
export const STORE_HOURS = [
  { dayOfWeek: 'Monday',    opens: '12:00', closes: '16:00' },
  { dayOfWeek: 'Tuesday',   opens: '12:00', closes: '20:30' },
  { dayOfWeek: 'Wednesday', opens: '12:00', closes: '20:30' }, // ⚠️ confirmar
  { dayOfWeek: 'Thursday',  opens: '12:00', closes: '18:00' },
  { dayOfWeek: 'Friday',    opens: '12:00', closes: '18:00' },
  { dayOfWeek: 'Saturday',  opens: '12:00', closes: '18:00' },
] as const

// ─── Horários do listening bar ────────────────────────────────────────────────
// Fonte: Instagram oficial
// Horários após meia-noite (closes < opens) são referentes ao dia seguinte.
// Schema.org interpreta "closes: 00:30" como 00h30 do dia seguinte.
export const BAR_HOURS = [
  { dayOfWeek: 'Tuesday',   opens: '19:00', closes: '00:30' },
  { dayOfWeek: 'Wednesday', opens: '19:00', closes: '00:30' },
  { dayOfWeek: 'Thursday',  opens: '19:00', closes: '00:30' },
  { dayOfWeek: 'Friday',    opens: '19:00', closes: '01:30' },
  { dayOfWeek: 'Saturday',  opens: '19:00', closes: '01:30' },
] as const

// ─── Navegação ────────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Experiência', href: '/#experiencia' },
  { label: 'Agenda', href: '/#agenda' },
  { label: 'Cardápio', href: '/#cardapio' },
  { label: 'Discos', href: '/#discos' },
  { label: 'Visite', href: '/#visite' },
] as const

// ─── Experiências ─────────────────────────────────────────────────────────────
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

// ─── Eventos ──────────────────────────────────────────────────────────────────
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

// ─── Cardápio ─────────────────────────────────────────────────────────────────
export const MENU_A = [
  { name: 'Haibōru', description: 'Whisky Union e club soda.' },
  { name: 'Cuba Libre', description: 'Rum Havana Club, Coca-Cola e limão-taiti.' },
  { name: 'Bamboo Spritz', description: 'Jerez Fino, vermouth dry e espumante.' },
  { name: 'Paloma', description: 'Tequila Don Julio, suco de toranja, limão-taiti e club soda.' },
  { name: 'Fitzgerald', description: 'Gin Verve, xarope simples, limão-siciliano e Bitter Angostura.' },
] as const

export const MENU_B = [
  { name: 'Momo Hai', description: 'Whisky Union, pêssego e club soda.' },
  { name: 'Cubano', description: 'Amaro de Cola, Cynar, xarope de açúcar e limão-taiti.' },
  { name: 'Jasmin Groove', description: 'Gin Verve, cordial de lichia e jasmim, limão-siciliano e pepino.' },
  { name: 'Hold Up', description: 'Vodka Verve, Aperol, gengibre, pêssego, limão-taiti e abacaxi.' },
  { name: 'London Calling', description: 'Gin Verve, Jerez Fino, limão-siciliano e Bitter Angostura Orange.' },
] as const

// ─── Loja de discos ───────────────────────────────────────────────────────────
export const RECORD_COLLECTIONS = [
  { title: 'Novidades da semana', description: 'Novos títulos e reposições selecionadas pela equipe.' },
  { title: 'Escolhas da casa', description: 'Discos que estão tocando no bar e fazem parte da nossa curadoria.' },
  { title: 'Lançamentos independentes', description: 'Artistas, selos e projetos que ajudam a movimentar a cena musical.' },
] as const

// ─── Galeria ──────────────────────────────────────────────────────────────────
// Imagens em /public/gallery/ — alt text contextual, sem prefixo "foto de" ou "imagem de"
export const GALLERY_ITEMS = [
  {
    src: '/gallery/turntable-record-cover.jpeg',
    alt: 'Toca-discos com disco de vinil no Purple Cat, Curitiba',
    caption: 'O sistema de som e a experiência de escuta.',
  },
  {
    src: '/gallery/vinyl-record-wall.jpeg',
    alt: 'Parede de discos de vinil na loja do Purple Cat em Curitiba',
    caption: 'Discos selecionados pela equipe.',
  },
  {
    src: '/gallery/cocktail-mundo-racional.jpeg',
    alt: 'Drink autoral preparado no balcão do Purple Cat',
    caption: 'Drinks preparados no balcão.',
  },
  {
    src: '/gallery/purplecat-lightbox.jpeg',
    alt: 'Sessão de audição no Purple Cat com a lightbox iluminada',
    caption: 'Sessões de audição compartilhada.',
  },
  {
    src: '/gallery/bar-and-records.jpeg',
    alt: 'Interior do Purple Cat com bar e acervo de discos em Curitiba',
    caption: 'Detalhes do espaço.',
  },
  {
    src: '/gallery/purplecat-entrance.jpeg',
    alt: 'Fachada e entrada do Purple Cat Listening Bar & Records em Curitiba',
    caption: 'Noites no Purple Cat.',
  },
] as const

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export const FAQS = [
  { question: 'Precisa reservar?', answer: 'As regras podem variar conforme o dia e a programação. Consulte nossa equipe antes da visita.' },
  { question: 'Posso comprar discos durante a noite?', answer: 'A disponibilidade da loja fora do horário regular deve ser confirmada com a equipe.' },
  { question: 'Existem opções sem álcool?', answer: 'Sim. O cardápio pode incluir drinks sem álcool e outras bebidas.' },
  { question: 'Existem opções vegetarianas?', answer: 'Consulte o cardápio atualizado ou fale com a equipe sobre restrições alimentares.' },
  { question: 'O Purple Cat realiza eventos?', answer: 'O espaço possui uma programação própria de audições, lançamentos e sessões especiais.' },
  { question: 'Posso propor uma parceria ou evento?', answer: 'Artistas, selos, curadores e projetos culturais podem entrar em contato para apresentar propostas.' },
] as const
