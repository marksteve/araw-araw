import tw from 'twin.macro'
import Title from './Title'

const Container = tw.div`flex flex-col justify-center items-center h-screen`

const Button = tw.button`shadow shadow-lg leading-loose px-2 rounded bg-blue-500 text-white`

export default function SignIn(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Container>
      <Title svg text="Araw-Araw&nbsp;:sun::sun:" />
      <Button {...props}>Sign in with Google</Button>
    </Container>
  )
}
