import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import create from 'zustand'
import firebaseApp from './firebase'

type State = {
  uid: string
  signIn: () => void
}

const useAuth = create<State>((set) => {
  const auth = getAuth(firebaseApp)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      set({ uid: user.uid })
    } else {
      set({ uid: 'none' })
    }
  })

  return {
    uid: '',
    signIn: () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
    },
  }
})

export default useAuth
