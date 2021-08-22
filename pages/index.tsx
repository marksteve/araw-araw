import dynamic from 'next/dynamic'
import Head from 'next/head'
import { ChangeEvent } from 'react'
import { Twemoji } from 'react-emoji-render'
import tw, { styled } from 'twin.macro'
import useAuth from '../auth'
import Habit from '../components/Habit'
import useStore from '../store'

const Container = tw.main`flex h-screen`

const Sidebar = tw.div`p-4 border-r flex flex-col gap-4`

const Title = styled(Twemoji, tw`text-xl font-bold flex items-center mb-4`)

const SidebarTitle = tw.h2`text-lg font-bold`

const Calendar = dynamic(() => import('../components/Calendar'), { ssr: false })

const ImportLabel = tw.label`text-sm`

const Import = tw.input`hidden`

export default function Home() {
  const uid = useAuth((state) => state.uid)
  const store = useStore(uid)

  const habits = store((state) => state.habits)
  const importState = store((state) => state.importState)

  function handleImport(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files!.length != 1) {
      return
    }
    const reader = new FileReader()
    const file = e.target.files![0]
    reader.addEventListener('load', (e) => {
      importState(JSON.parse(e.target!.result as string))
    })
    reader.readAsText(file)
  }

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
          <ImportLabel>
            Import from file&hellip;
            <Import
              type="file"
              accept="application/json"
              onChange={handleImport}
            />
          </ImportLabel>
        </Sidebar>
        <Calendar />
      </Container>
    </>
  )
}
