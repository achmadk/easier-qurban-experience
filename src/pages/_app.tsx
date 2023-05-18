import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { Provider as ReactReduxProvider } from 'react-redux'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'
import { ContainerProvider } from 'inversify-hooks-esm'

import { bindDependencyInjectionMethods } from 'dependency-injection'

import { wrapper } from 'state-management/store'

import 'windi.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'utils/integration/third-parties/font-awesome'
import './_app.css'

const publicRoutes = [
  '/',
  '/.well-known/assetlinks.json'
]

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pathname } = useRouter()
  const container = useMemo(() => bindDependencyInjectionMethods(), [])

  const isPublicPage = publicRoutes.includes(pathname)
  return (
    <ContainerProvider value={container}>
      <ReactReduxProvider store={store}>
        <Head>
          <title>Easier Qurban Experience (EQExp)</title>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <ToastContainer
          position="top-center"
        />
        <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API} {...props.pageProps}>
          {isPublicPage ? (
            <Component {...props.pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...props.pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
        </ClerkProvider>
      </ReactReduxProvider>
    </ContainerProvider>
  )
}

export default MyApp
