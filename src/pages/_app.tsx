import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'

import { bindDependencyInjectionMethods } from 'dependency-injection'

import 'windi.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './_app.css'

const publicRoutes = [
  '/'
]

bindDependencyInjectionMethods()

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const isPublicPage = publicRoutes.includes(pathname)
  return (
    <>
      <Head>
        <title>Easier Qurban Experience (EQExp)</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ToastContainer
        position="top-center"
      />
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
