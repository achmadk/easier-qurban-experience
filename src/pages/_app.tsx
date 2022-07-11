import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

import 'windi.css'
import './_app.css'

const publicRoutes = [
  '/'
]

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const isPublicPage = publicRoutes.includes(pathname)
  return (
    <>
      <Head>
        <title>Easier Qurban Experience (EQExp)</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ClerkProvider {...pageProps}>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </>
  )
}

export default MyApp
