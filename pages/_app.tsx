import { AppProps } from 'next/app'
import useAuth from '../auth'
import SignIn from '../components/SignIn'
import globalStyles from '../styles/globalStyles'

const App = ({ Component, pageProps }: AppProps) => {
  const uid = useAuth((state) => state.uid)
  const signIn = useAuth((state) => state.signIn)

  if (uid === '') {
    return null
  }

  globalStyles()

  return uid !== 'none' ? (
    <Component {...pageProps} />
  ) : (
    <SignIn onClick={signIn} />
  )
}

export default App
