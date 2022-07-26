import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { HeaderMosque } from 'components/03-organisms/header/mosque/Base'

import { useControllerCoreRouterIsParamsReady, useControllerMosqueAdminFindGetDataClient } from 'controllers'

import { IRouteCoreMosqueBase } from 'routes'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminMosqueIDProps extends IRouteCoreMosqueBase {}

export default function AdminMosqueID<
  PropType extends AdminMosqueIDProps = AdminMosqueIDProps
>(props: PropType) {
  const { checkValidCondition: checkParamsIsReady } =
    useControllerCoreRouterIsParamsReady<PropType>()
  
  const { getData: getMosqueData } =
    useControllerMosqueAdminFindGetDataClient()

  const paramsIsReady = checkParamsIsReady(props)

  useEffect(() => {
    if (props?.mosqueId) {
      getMosqueData({ mosqueId: props.mosqueId })
    }
  }, [getMosqueData, props.mosqueId])

  if (paramsIsReady) {
    const { mosqueId } = props
    return (
      <>
        <nav
          className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div
          className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            // onclick="toggleNavbar('example-collapse-sidebar')"
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link href={`/admin/mosques/${mosqueId}`}>
            <a
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              EQExp App
            </a>
          </Link>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <a
                className="text-blueGray-500 block py-1 px-3"
                href="#pablo"
                // onclick="openDropdown(event,'notification-dropdown')"
                ><i className="fas fa-bell"></i>
              </a>
              <div
                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                id="notification-dropdown">
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Action
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Another action
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Something else here
                </a>
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Separated link
                </a>
              </div>
            </li>
            <li className="inline-block relative">
              <a
                className="text-blueGray-500 block"
                href="#pablo"
                // onclick="openDropdown(event,'user-responsive-dropdown')"
                >
                <div className="items-center flex">
                  <span
                    className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                    <Image
                      alt="..."
                      className="w-full rounded-full align-middle border-none shadow-lg"
                      src="/assets/img/team-1-800x800.jpg"
                      layout='fill'
                    />
                  </span>
                </div>
              </a>
              <div
                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                id="user-responsive-dropdown"
              >
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Action
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Another action
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Something else here
                </a>
                <div
                  className="h-0 my-2 border border-solid border-blueGray-100" />
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                  Separated link
                </a>
              </div>
            </li>
          </ul>
          <div
            className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
            id="example-collapse-sidebar">
            <div
              className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    href={`/admin/mosques/${mosqueId}`}>
                    EQExp App
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    // onclick="toggleNavbar('example-collapse-sidebar')"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            <hr className="my-4 md:min-w-full" />
            <h6
              className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              Admin Layout Pages
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <a
                  href="./dashboard.html"
                  className="text-xs uppercase py-3 font-bold block text-pink-500 hover:text-pink-600"
                >
                  <i className="fas fa-tv mr-2 text-sm opacity-75"></i>
                  Dashboard
                </a>
              </li>

              <li className="items-center">
                <a
                  href="./settings.html"
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                >
                  <i className="fas fa-tools mr-2 text-sm text-blueGray-300"></i>
                  Settings
                </a>
              </li>

              <li className="items-center">
                <a
                  href="./tables.html"
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                >
                  <i className="fas fa-table mr-2 text-sm text-blueGray-300"></i>
                  Tables
                </a>
              </li>

              <li className="items-center">
                <a
                  href="./maps.html"
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                >
                  <i
                    className="fas fa-map-marked mr-2 text-sm text-blueGray-300"
                  ></i>
                  Maps
                </a>
              </li>
            </ul>

            <hr className="my-4 md:min-w-full" />
            <h6
              className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              Auth Layout Pages
            </h6>

            <ul
              className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4"
            >
              <li className="items-center">
                <a
                  href="../auth/login.html"
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                >
                  <i
                    className="fas fa-fingerprint text-blueGray-300 mr-2 text-sm"
                  ></i>
                  Login
                </a>
              </li>

              <li className="items-center">
                <a
                  href="../auth/register.html"
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                >
                  <i
                    className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"
                  ></i>
                  Register
                </a>
              </li>
            </ul>

            <hr className="my-4 md:min-w-full" />
            <h6
              className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
              No Layout Pages
            </h6>

            <ul
              className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4"
            >
              <li className="items-center">
                <a
                  href="../landing.html"
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                >
                  <i
                    className="fas fa-newspaper text-blueGray-300 mr-2 text-sm"
                  ></i>
                  Landing Page
                </a>
              </li>

              <li className="items-center">
                <a
                  href="../profile.html"
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                >
                  <i
                    className="fas fa-user-circle text-blueGray-300 mr-2 text-sm"
                  ></i>
                  Profile Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <div className="relative md:ml-64 bg-blueGray-50">
          <HeaderMosque />
          <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  return 'Loading...'
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { mosqueId: '1' } }]
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params: props }) => {
  return {
    props
  }
}