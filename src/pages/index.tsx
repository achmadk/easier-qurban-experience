import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import router from 'next/router'

import { Header } from '../components/03-organisms/header/Base'
import { Footer } from '../components/03-organisms/footer/Base'
import { SectionHome } from 'components/03-organisms/sections/Home'

export default function Home() {
  const { isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/admin/home')
    }

  }, [isSignedIn])

  return (
    <>
      <Header />
      <SectionHome />
      <Footer />
    </>
  )
}
