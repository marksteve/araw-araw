import download from 'downloadjs'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { ChangeEvent, MouseEvent } from 'react'
import tw from 'twin.macro'
import useAuth from '../auth'
import Habit from '../components/Habit'
import Title from '../components/Title'
import useStore from '../store'

export default function Home() {
  const uid = useAuth((state) => state.uid)
  const signOut = useAuth((state) => state.signOut)
  const store = useStore(uid)
  const state = store((state) => state)

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

  function handleExport(e: MouseEvent<HTMLButtonElement>) {
    download(
      JSON.stringify(state),
      `araw-araw-${Date.now()}.json`,
      'application/json'
    )
  }

  function handleSignOut(e: MouseEvent<HTMLButtonElement>) {
    signOut()
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
          <Habits>
            <SidebarTitle>Habits</SidebarTitle>
            {habits.map((habit) => (
              <Habit key={habit.id} habit={habit} />
            ))}
          </Habits>
          <ImportLabel>
            Import from file&hellip;
            <Import
              type="file"
              accept="application/json"
              onChange={handleImport}
            />
          </ImportLabel>
          <Export onClick={handleExport}>Export to file&hellip;</Export>
          <SignOut onClick={handleSignOut}>Sign out</SignOut>
        </Sidebar>
        <Calendar />
      </Container>
    </>
  )
}

const Container = tw.main`flex h-screen`

const Sidebar = tw.div`p-4 border-r flex flex-col items-start gap-4`

const SidebarTitle = tw.h2`text-lg font-bold`

const Habits = tw.div`flex-grow`

const ImportLabel = tw.label`text-sm cursor-pointer hover:underline`

const Import = tw.input`hidden`

const Export = tw.button`text-sm hover:underline`

const SignOut = tw.button`text-sm hover:underline`

const Calendar = dynamic(() => import('../components/Calendar'), { ssr: false })
