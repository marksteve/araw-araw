import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Twemoji } from 'react-emoji-render'
import tw, { styled } from 'twin.macro'
import Habit from '../components/Habit'
import { useStore } from '../store'

const Container = tw.main`flex flex h-screen`

const Sidebar = tw.div`p-4 border-r flex flex-col gap-4`

const Title = styled(Twemoji, tw`text-xl font-bold flex items-center mb-4`)

const SidebarTitle = tw.h2`text-lg font-bold`

const Calendar = dynamic(() => import('../components/Calendar'), { ssr: false })

export default function Home() {
  const habits = useStore((state) => state.habits)
  return (
    <>
      <Head>
        <title>Araw-Araw</title>
        <meta name="description" content="Dahan-dahan. Isa-isa." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Sidebar>
          <Title svg text="Araw-Araw&nbsp;:sun::sun:" />
          <SidebarTitle>Habits</SidebarTitle>
          {habits.map((habit) => (
            <Habit key={habit.id} habit={habit} />
          ))}
        </Sidebar>
        <Calendar />
      </Container>
    </>
  )
}
