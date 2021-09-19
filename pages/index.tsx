import download from 'downloadjs'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { ChangeEvent, MouseEvent, useState } from 'react'
import tw, { styled } from 'twin.macro'
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

  const [sidebarToggled, setSidebarToggled] = useState(false)

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

  function toggleSidebar(e: MouseEvent<HTMLSpanElement>) {
    setSidebarToggled(!sidebarToggled)
  }

  return (
    <>
      <Head>
        <title>Araw-Araw</title>
        <meta name="description" content="Dahan-dahan. Isa-isa." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Title svg text="Araw-Araw&nbsp;:sun::sun:" onClick={toggleSidebar} />
        <Sidebar toggled={sidebarToggled}>
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

const Calendar = dynamic(() => import('../components/Calendar'), { ssr: false })

const Sidebar = styled.div({
  ...tw`
  px-4 pb-4 pt-16 flex flex-col items-stretch gap-4
  absolute inset-0 z-10 bg-white
  sm:border-r sm:items-start sm:static
`,
  variants: {
    toggled: {
      true: tw`flex sm:flex`,
      false: tw`hidden sm:flex`,
    },
  },
})

const Container = styled.main({
  ...tw`
    flex flex-col h-screen
    sm:flex-row
  `,
  [`& ${Title}`]: tw`absolute top-4 left-4 z-20`,
  [`& .calendar`]: tw`mt-16`,
})

const SidebarTitle = tw.h2`
  text-lg font-bold
`

const Habits = tw.div`
  col-span-2 flex-grow
`

const ImportLabel = tw.label`text-sm cursor-pointer hover:underline`

const Import = tw.input`hidden`

const Export = tw.button`text-sm text-left hover:underline`

const SignOut = tw.button`text-sm text-left hover:underline`
