/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useCallback } from 'react'

import Link from 'next/link'

import { addRefProps, PropsWithInnerRef } from '../../../utils'

const HeaderBase = ({ innerRef }: PropsWithInnerRef) => {
  const [hamburgerMenuOpened, setHamburgerMenuOpened] = useState(false)

  /**
   * @todo uncomment navigation variable if features section
   * is ready
   */
  // const navigation = useMemo(
  //   () => [
  //     { title: 'Home', path: '#home' },
  //     { title: 'Features', path: '#features' }
  //   ],
  //   []
  // )

  const toggleHamburgerMenu = useCallback(() => {
    setHamburgerMenuOpened((prevState) => !prevState)
  }, [])

  return (
    <header ref={innerRef}>
      <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
        <div className="flex justify-between">
          <Link href="/">
            <a>
              EQExp App
            </a>
          </Link>
          <button className="text-gray-500 outline-none md:hidden" onClick={toggleHamburgerMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={hamburgerMenuOpened ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        <ul
          className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${
            hamburgerMenuOpened ? '' : 'hidden'
          }`}
        >
          <li className="order-2 pb-5 md:pb-0">
            <a
              href="/admin/home"
              className="py-3 px-6 rounded-md shadow-md text-white text-center bg-blue-600 focus:shadow-none block md:inline"
            >
              Sign In
            </a>
          </li>
          <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
            {/**
              * @todo uncomment navigation variable if features section
              * is ready
              */}
            {/* {navigation.map((item, idx) => (
              <li className="text-gray-600 hover:text-blue-700" key={idx}>
                <a href={item.path}>{item.title}</a>
              </li>
            ))} */}
          </div>
        </ul>
      </nav>
    </header>
  )
}

export const Header = addRefProps(HeaderBase)
