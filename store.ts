import { startOfMonth } from 'date-fns'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import produce from 'immer'
import create, { UseStore } from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'
import firebaseApp from './firebase'

export type HabitState = {
  id: string
  emoji: string
  name: string
}

export type LogState = Record<string, HabitState['id'][]>

type State = {
  selectedMonth: Date
  habits: HabitState[]
  selectedHabit: HabitState | null
  log: LogState
  getSelectedMonth: () => Date
  selectMonth: (month: Date) => void
  selectHabit: (habit: HabitState) => void
  logHabit: (habit: HabitState, date: string) => void
  importState: (state: State) => void
}

const initialState = {
  selectedMonth: startOfMonth(new Date()),
  habits: [],
  selectedHabit: null,
  log: {},
}
let store: UseStore<State>
export default function useStore(uid: string) {
  if (store) {
    return store
  }
  store = create<State>(
    persist(
      (set, get) => ({
        ...initialState,
        getSelectedMonth: () => new Date(get().selectedMonth),
        selectMonth: (month) => set({ selectedMonth: month }),
        selectHabit: (habit) => set({ selectedHabit: habit }),
        logHabit: (habit, date) =>
          set(
            produce((state) => {
              state.log[date] = state.log[date] || []
              const index = state.log[date].indexOf(habit.id)
              if (index === -1) {
                state.log[date].push(habit.id)
              } else {
                state.log[date].splice(index, 1)
              }
            })
          ),
        importState: ({ selectedMonth, habits, selectedHabit, log }) =>
          set({ selectedMonth, habits, selectedHabit, log }),
      }),
      {
        name: uid,
        getStorage: () => storage,
        whitelist: ['selectedMonth', 'habits', 'selectedHabit', 'log'],
      }
    )
  )
  return store
}

const db = getFirestore(firebaseApp)
const rootRef = collection(db, 'araw-araw')

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const data = (await getDoc(doc(rootRef, name))).data()
    return JSON.stringify(data)
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await setDoc(doc(rootRef, name), JSON.parse(value))
  },
}
