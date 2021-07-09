import { Twemoji } from 'react-emoji-render'
import tw, { styled } from 'twin.macro'
import { useStore } from '../store'

const Container = tw.div`absolute inset-0 flex justify-center items-center cursor-pointer`

const Habits = tw.div`flex flex-wrap justify-center gap-2 w-3/4`

const Habit = styled(Twemoji, tw`p-2 rounded shadow bg-white`)

const NewHabit = styled.div({
  ...tw`hidden opacity-50`,
  [`${Container}:hover &`]: tw`flex`,
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
        {!loggedHabits.map(h => h?.id).includes(selectedHabit?.id) && (
          <NewHabit>
            <Habit svg text={selectedHabit?.emoji || ''} />
          </NewHabit>
        )}
      </Habits>
    </Container>
  )
}
