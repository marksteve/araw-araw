import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  sub,
} from 'date-fns'
import tw, { styled } from 'twin.macro'
import LogHabit from '../components/LogHabit'
import { useStore } from '../store'

const Container = tw.div`flex-grow flex flex-col`

const MonthNav = tw.div`flex justify-between p-2 border-b`

const MonthLink = tw.button``

const SelectedMonth = tw.div`text-lg font-bold`

const DayHeader = tw.div`flex p-4`

const DayOfWeek = tw.div`font-bold flex-1 p-2 text-sm text-center text-gray-500`

const DayGrid = tw.div`flex-grow grid grid-cols-7 grid-rows-6 gap-4 p-4`

const Day = styled.div({
  ...tw`bg-gray-100 rounded p-2 relative`,
  variants: {
    offset: {
      0: tw`col-start-7`,
      1: tw`col-start-1`,
      2: tw`col-start-2`,
      3: tw`col-start-3`,
      4: tw`col-start-4`,
      5: tw`col-start-5`,
      6: tw`col-start-6`,
    },
    logged: {
      true: tw`bg-yellow-100`,
    },
  },
})

export default function Calendar() {
  const selectedMonth = useStore((state) => state.getSelectedMonth())
  const prevMonth = sub(selectedMonth, { months: 1 })
  const nextMonth = add(selectedMonth, { months: 1 })
  const selectMonth = useStore((state) => state.selectMonth)
  const days = eachDayOfInterval({
    start: selectedMonth,
    end: endOfMonth(selectedMonth),
  })
  const offset = getDay(selectedMonth)
  const selectedHabit = useStore((state) => state.selectedHabit)
  const log = useStore((state) => state.log)

  function handlePrevMonth() {
    selectMonth(prevMonth)
  }

  function handleNextMonth() {
    selectMonth(nextMonth)
  }

  return (
    <Container>
      <MonthNav>
        <MonthLink onClick={handlePrevMonth}>
          &lsaquo; {format(prevMonth, 'MMMM yyyy')}
        </MonthLink>
        <SelectedMonth>{format(selectedMonth, 'MMMM yyyy')}</SelectedMonth>
        <MonthLink onClick={handleNextMonth}>
          {format(nextMonth, 'MMMM yyyy')} &rsaquo;
        </MonthLink>
      </MonthNav>
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
        {days.map((day, i) => {
          const date = format(day, 'yyyy-MM-dd')
          return (
            <Day
              key={i}
              offset={i === 0 && offset}
              logged={
                selectedHabit && (log[date] || []).includes(selectedHabit!.id)
              }
            >
              {format(day, 'd')}
              <LogHabit date={date} />
            </Day>
          )
        })}
      </DayGrid>
    </Container>
  )
}
