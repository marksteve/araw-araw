import Head from 'next/head'
import tw, { styled } from 'twin.macro'
import Habit from '../components/Habit'
import LogHabit from '../components/LogHabit'
import { useStore } from '../store'

const Container = tw.main`flex flex h-screen`

const Sidebar = tw.div`p-5 border-r flex flex-col gap-4`

const Title = tw.h1`text-xl font-bold mb-4`

const Calendar = tw.div`flex-grow flex flex-col p-5`

const DayHeader = tw.div`flex`

const DayOfWeek = tw.div`font-bold flex-1 p-2`

const DayGrid = tw.div`flex-grow grid grid-cols-7 grid-rows-6 gap-4`

const Day = styled.div({
  ...tw`bg-gray-100 rounded p-2 relative`,
  variants: {
    offset: {
      1: tw`col-start-1`,
      2: tw`col-start-2`,
      3: tw`col-start-3`,
      4: tw`col-start-4`,
      5: tw`col-start-5`,
      6: tw`col-start-6`,
    },
  },
})

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
          <Title>Araw-Araw</Title>
          {habits.map((habit) => (
            <Habit key={habit.id} habit={habit} />
          ))}
        </Sidebar>
        <Calendar>
          <DayHeader>
            <DayOfWeek>MON</DayOfWeek>
            <DayOfWeek>TUE</DayOfWeek>
            <DayOfWeek>WED</DayOfWeek>
            <DayOfWeek>THU</DayOfWeek>
            <DayOfWeek>FRI</DayOfWeek>
            <DayOfWeek>SAT</DayOfWeek>
            <DayOfWeek>SUN</DayOfWeek>
          </DayHeader>
          <DayGrid>
            {new Array(31).fill(Boolean).map((_, i) => (
              <Day key={i} offset={i === 0 && 4}>
                {i + 1}
                <LogHabit date={`2021-07-${i + 1}`} />
              </Day>
            ))}
          </DayGrid>
        </Calendar>
      </Container>
    </>
  )
}
