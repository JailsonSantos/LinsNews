import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import NextNprogress from 'nextjs-progressbar';
import { Provider as NextAuthProvider } from 'next-auth/client'

import '../styles/global.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <NextNprogress
        color="#eba417"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default App
