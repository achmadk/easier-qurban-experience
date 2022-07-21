import { useMemo, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { container } from 'inversify-hooks-esm'
import { usePopper } from 'react-popper'
import { useRouter } from 'next/router'

import Link from 'next/link'

import {
  // CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT,
  // IControllerCoreHandleSubmit,
  IControllerCoreLogout,
  useControllerMosqueAdminFindCheckValidConditionIsEmpty,
  useControllerMosqueAdminFindGetResourceDataClient
} from 'controllers'
import { IMosqueWithID } from 'models'
import { ComponentOrganismFormMosqueRegistration } from 'components/03-organisms/forms/mosque/registration/Base'

export default function AdminHome<InputType extends IMosqueWithID = IMosqueWithID>() {
  const { user } = useUser()
  const router = useRouter()
  const logoutCtrl = useMemo(() =>
    container.get<IControllerCoreLogout>(
      CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT
    )
  , [])
  // const mosqueRegisterCtrl = useMemo(() =>
  //   container.get<IControllerCoreHandleSubmit<InputType>>(
  //     CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT
  //   )
  // , [])

  const referenceEl = useRef<HTMLAnchorElement>(null)
  const dropdownEl = useRef<HTMLDivElement>(null)
  const { styles, attributes } = usePopper(referenceEl.current, dropdownEl.current, {
    placement: 'bottom-start'
  })

  const { loading: loadingMosqueData, data: mosqueData, getData: getMosqueData } =
    useControllerMosqueAdminFindGetResourceDataClient<InputType>()

  const { checkValidCondition: checkMosqueDataIsEmpty } =
    useControllerMosqueAdminFindCheckValidConditionIsEmpty<InputType>()

  const isMosqueDataEmpty = checkMosqueDataIsEmpty(mosqueData)

  // const handleRegisterMosqueClicked = async () => {
  //   const dummyInput = { name: 'Baabussalam Mosque' } as InputType
  //   await mosqueRegisterCtrl.handleSubmit(dummyInput)
  // }

  /* Function for opening/closing navbar on mobile */
  const toggleNavbar = (elementId: string) => {
    const elementNode = document.getElementById(elementId)
    elementNode.classList.toggle("hidden");
    elementNode.classList.toggle("block");
  }

  const toggleDropdown = () => {
    dropdownEl.current?.classList?.toggle('hidden')
  }

  const handleAfterSubmit = (input: InputType) => {
    router.push(`/admin/mosques/${input.id}`)
  }

  useEffect(() => {
    getMosqueData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isMosqueDataEmpty) {
      mosqueData.map((item) => {
        router.prefetch(`/admin/mosques/${item.id}`)
        return item
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMosqueDataEmpty])

  console.log(mosqueData)

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div
          className="container px-4 mx-auto flex flex-wrap items-center justify-between"
        >
          <div
            className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
          >
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              href="/"
              >EQExp App</Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => toggleNavbar('collapse-navbar')}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden"
            id="collapse-navbar"
          >
            <ul
              className="flex flex-col lg:flex-row list-none lg:ml-auto items-center"
            >
              <li className="inline-block relative">
                <a
                  ref={referenceEl}
                  className="lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#pablo"
                  onClick={toggleDropdown}
                >
                  Account
                </a>
                <div
                  ref={dropdownEl}
                  className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <span
                    className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                  />
                  <a
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
                    onClick={logoutCtrl.logout}
                  >
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75"
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
        >
          <span className="w-full h-full absolute" />
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="font-semibold text-5xl">
                  {`Welcome ${user?.fullName ?? '-'}`}
                </h1>
                <p className="mt-4 text-lg text-blueGray-200">
                  {loadingMosqueData ? 'Please wait...' : `Please ${isMosqueDataEmpty ? 'register' : 'select'} your mosque first`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0px)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {!loadingMosqueData && !isMosqueDataEmpty && (
          <div className="flex flex-wrap">
            {mosqueData.map((item, index) => {
              return (
                <Link key={`mosque-item-${index}`} href={`/admin/mosques/${item.id}`}>
                  <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center cursor-pointer">
                  <div
                    className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
                  >
                    <div className="px-4 py-5 flex-auto">
                      <div
                        className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-600"
                      >
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl font-semibold">{item.name}</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {item?.address ?? 'No address'}
                      </p>
                    </div>
                  </div>
                </div>
                </Link>
              )
            })}
          </div>
        )}
        {!loadingMosqueData && isMosqueDataEmpty && (
          <ComponentOrganismFormMosqueRegistration onAfterSubmit={handleAfterSubmit} />
        )}
      </div>

    </>
  )
}
