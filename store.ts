import create from 'zustand'
import { persist } from 'zustand/middleware'
import produce from 'immer'
// import { nanoid } from 'nanoid'

export type HabitState = {
  id: string
  emoji: string
  name: string
}

export type LogState = Record<string, HabitState['id'][]>

type State = {
  habits: HabitState[]
  selectedHabit: HabitState | null
  selectHabit: (habit: HabitState) => void
  log: LogState
  logHabit: (habit: HabitState, date: string) => void
}

export const useStore = create<State>(
  persist(
    (set, get) => ({
      habits: [
        // {
        //   id: nanoid(),
        //   emoji: ':muscle:',
        //   name: 'Work out',
        // },
        // {
        //   id: nanoid(),
        //   emoji: ':cartwheeling:',
        //   name: 'Mobility program',
        // },
      ],
      selectedHabit: null,
      selectHabit: (habit) => set({ selectedHabit: habit }),
      log: {},
      logHabit: (habit, date) =>
        set(
          produce((state) => {
            state.log[date] = [...(state.log[date] || []), habit.id]
          })
        ),
    }),
    {
      name: 'araw-araw', // unique name
    }
  )
)
