import { Twemoji } from 'react-emoji-render'
import tw, { styled } from 'twin.macro'
import useAuth from '../auth'
import useStore, { HabitState } from '../store'

const Container = styled.div({
  ...tw`
    flex
    items-center
    gap-1
    px-3
    py-2
    rounded
    cursor-pointer
    hover:shadow-lg
  `,
  variants: {
    selected: {
      true: tw`bg-yellow-100`,
    },
  },
})

type HabitProps = {
  habit: HabitState
  selected?: boolean
}

export default function Habit({ habit }: HabitProps) {
  const uid = useAuth((state) => state.uid)
  const store = useStore(uid)

  const selectHabit = store((state) => state.selectHabit)
  const selected = store((state) => habit.id === state.selectedHabit?.id)

  function handleClick() {
    selectHabit(habit)
  }

  return (
    <Container selected={selected} onClick={handleClick}>
      <Twemoji svg text={habit.emoji} />
      {habit.name}
    </Container>
  )
}
