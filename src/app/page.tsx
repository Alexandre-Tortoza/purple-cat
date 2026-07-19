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

export default function Home() {
  return (
    <>
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
