import { Twemoji } from 'react-emoji-render'
import tw, { styled } from 'twin.macro'
import { useStore } from '../store'

const Container = tw.div`absolute inset-0 flex justify-center items-center cursor-pointer`

const Habits = tw.div`flex gap-x-2`

const Habit = styled(Twemoji, tw`p-2 rounded shadow bg-white`)

const NewHabit = styled(Habit, {
  ...tw`hidden`,
  [`${Container}:hover &`]: tw`block`,
})

type LogHabitProps = {
  date: string
}

export default function LogHabit({ date }: LogHabitProps) {
  const selectedHabit = useStore((state) => state.selectedHabit)
  const habits = useStore((state) => state.habits || [])
  const loggedHabits = useStore((state) => state.log[date] || []).map(
    (habitId) => habits.find((habit) => habit.id === habitId)
  )
  const logHabit = useStore((state) => state.logHabit)

  function handleClick() {
    logHabit(selectedHabit!, date)
  }

  return (
    <Container onClick={handleClick}>
      <Habits>
        {loggedHabits.map((habit) => (
          <Habit svg text={habit?.emoji || ''} key={habit?.id} />
        ))}
        <NewHabit svg text={selectedHabit?.emoji || ''} />
      </Habits>
    </Container>
  )
}
