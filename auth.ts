import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import create from 'zustand'
import firebaseApp from './firebase'

type State = {
  uid: string
  signIn: () => void
  signOut: () => Promise<void>
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
      return signInWithPopup(auth, provider)
    },
    signOut: () => signOut(auth),
  }
})

export default useAuth
