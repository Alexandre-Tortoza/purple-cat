import { About } from '@/widgets/About'
import { Agenda } from '@/widgets/Agenda'
import { Contact } from '@/widgets/Contact'
import { Experience } from '@/widgets/Experience'
import { FAQ } from '@/widgets/FAQ'
import { FinalCTA } from '@/widgets/FinalCTA'
import { Gallery } from '@/widgets/Gallery'
import { Hero } from '@/widgets/Hero'
import { Manifesto } from '@/widgets/Manifesto'
import { MenuSection } from '@/widgets/MenuSection'
import { Newsletter } from '@/widgets/Newsletter'
import { Records } from '@/widgets/Records'
import { ScrollStackCard } from '@/shared/ui/ScrollStackCard'
import { SITE, BAR_HOURS, STORE_HOURS, BUSINESS_PHONE, BUSINESS_LATITUDE, BUSINESS_LONGITUDE } from '@/shared/config/site'

// ─── JSON-LD @graph ───────────────────────────────────────────────────────────
// Abordagem escolhida: BarOrPub principal + departamento MusicStore separado.
// Justificativa: as duas entidades possuem horários distintos, o que torna
// a representação via "department" semanticamente mais fiel que múltiplos @type.
//
// ⚠️ PENDÊNCIA: confirmar horário de quarta-feira da loja com o Purple Cat
//    antes de submeter ao Google Business Profile.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // WebSite — permite que o Google reconheça o site como entidade
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      'name': SITE.fullName,
      'alternateName': SITE.alternateName,
      'url': SITE.url,
      'inLanguage': 'pt-BR',
    },

    // WebPage — âncora semântica para a página inicial
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/#webpage`,
      'url': SITE.url,
      'name': `${SITE.name} | Listening Bar & Records em Curitiba`,
      'description': SITE.description,
      'isPartOf': { '@id': `${SITE.url}/#website` },
      'about': { '@id': `${SITE.url}/#business` },
      'inLanguage': 'pt-BR',
    },

    // BarOrPub principal com departamento MusicStore
    {
      '@type': 'BarOrPub',
      '@id': `${SITE.url}/#business`,
      'name': SITE.fullName,
      'alternateName': SITE.alternateName,
      'description': SITE.description,
      'url': SITE.url,
      'email': SITE.email,
      // Telefone e coordenadas não confirmados — omitidos intencionalmente
      ...(BUSINESS_PHONE ? { 'telephone': BUSINESS_PHONE } : {}),
      ...(BUSINESS_LATITUDE && BUSINESS_LONGITUDE ? {
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': BUSINESS_LATITUDE,
          'longitude': BUSINESS_LONGITUDE,
        },
      } : {}),
      'image': `${SITE.url}/opengraph-image`,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': SITE.address,
        'addressLocality': 'Curitiba',
        'addressRegion': 'PR',
        'postalCode': '80430-180',
        'addressCountry': 'BR',
      },
      // Horários do listening bar (Ter-Qui 19h-00h30 / Sex-Sáb 19h-01h30)
      // "closes" após meia-noite refere-se ao dia seguinte — interpretação padrão do Schema.org
      'openingHoursSpecification': BAR_HOURS.map(h => ({
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': `https://schema.org/${h.dayOfWeek}`,
        'opens': h.opens,
        'closes': h.closes,
      })),
      'sameAs': [SITE.instagramUrl],
      'hasMap': SITE.mapUrl,

      // Departamento: loja de discos com horários próprios
      'department': {
        '@type': 'MusicStore',
        '@id': `${SITE.url}/#records`,
        'name': `${SITE.alternateName} Records`,
        'description': 'Loja de discos de vinil com lançamentos, clássicos e títulos independentes no Centro de Curitiba.',
        'url': SITE.url,
        'email': SITE.email,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': SITE.address,
          'addressLocality': 'Curitiba',
          'addressRegion': 'PR',
          'postalCode': '80430-180',
          'addressCountry': 'BR',
        },
        'openingHoursSpecification': STORE_HOURS.map(h => ({
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': `https://schema.org/${h.dayOfWeek}`,
          'opens': h.opens,
          'closes': h.closes,
        })),
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollStackCard><Hero /></ScrollStackCard>
      <ScrollStackCard><About /></ScrollStackCard>
      <ScrollStackCard><Experience /></ScrollStackCard>
      <ScrollStackCard><Agenda /></ScrollStackCard>
      <ScrollStackCard><MenuSection /></ScrollStackCard>
      <ScrollStackCard><Records /></ScrollStackCard>
      <ScrollStackCard><Manifesto /></ScrollStackCard>
      <ScrollStackCard><Gallery /></ScrollStackCard>
      <ScrollStackCard><Contact /></ScrollStackCard>
      <ScrollStackCard><FAQ /></ScrollStackCard>
      <ScrollStackCard><Newsletter /></ScrollStackCard>
      <ScrollStackCard isLast><FinalCTA /></ScrollStackCard>
    </>
  )
}
