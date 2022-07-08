import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import router from 'next/router'

import { Header } from '../components/03-organisms/header/Base'
import { Footer } from '../components/03-organisms/footer/Base'
import { SectionHome } from 'components/03-organisms/sections/Home'

export default function Home() {
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin/home')
    }
  }, [status])

  return (
    <>
      <Header />
      <SectionHome />
      <Footer />
    </>
  )
}
