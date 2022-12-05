import { type MouseEvent, useRef } from "react"
import { useSelector } from "react-redux"
import { useContainerGet } from 'inversify-hooks-esm'
import { useUser } from '@clerk/nextjs'
import { createPopper } from '@popperjs/core'

import Link from 'next/link'
import Image from 'next/image'
// import Image from 'next/future/image'

import { addRefProps, PropsWithInnerRef } from "utils"
import { getMosqueID } from "state-management"

import { CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT, IControllerCoreLogout } from "controllers"

export interface SidebarAdminBaseProps extends PropsWithInnerRef<HTMLElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const SidebarAdminBase = <
  PropType extends SidebarAdminBaseProps = SidebarAdminBaseProps
>({ innerRef, children = null }: PropType) => {
  const mosqueId = useSelector(getMosqueID)
  const { user } = useUser()
  const collapseSidebarRef = useRef<HTMLDivElement>()

  const logoutCtrl = useContainerGet<IControllerCoreLogout>(
    CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT
  )

  const toggleNavbar = () => {
    const el = collapseSidebarRef.current
    el.classList.toggle("hidden");
    el.classList.toggle("bg-white");
    el.classList.toggle("m-2");
    el.classList.toggle("py-3");
    el.classList.toggle("px-6");
  }

  const toggleDropdown = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let element = event.target as any
    while (element.nodeName !== "A") {
        element = element.parentNode;
    }
    const elById = document.getElementById(id)
    createPopper(element, elById, {
        placement: "bottom-start",
    });
    elById.classList.toggle("hidden");
    elById.classList.toggle("block");
  }

  return (
    <nav
      ref={innerRef}
      className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div
        className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={toggleNavbar}>
            <i className="fas fa-bars" />
          </button>
          <Link href={`/admin/mosques/${mosqueId}`} legacyBehavior>
            <a
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              EQExp App
            </a>
          </Link>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <a
                className="text-blueGray-500 block"
                onClick={toggleDropdown('user-responsive-dropdown')}
                >
                <div className="items-center flex">
                  <span
                    className="relative w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                    <Image
                      alt={`${user.fullName} Profile Image URL`}
                      className="w-full rounded-full align-middle border-none shadow-lg"
                      src={user.profileImageUrl}
                      width={48}
                      height={48}
                    />
                  </span>
                </div>
              </a>
              <div
                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                id="user-responsive-dropdown">
                <a
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  onClick={logoutCtrl.logout}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
          <div
            ref={collapseSidebarRef}
            className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
            id="collapse-sidebar">
            <div
              className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    href={`/admin/mosques/${mosqueId}`}
                    legacyBehavior>
                    EQExp App
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={toggleNavbar}>
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </nav>
  )
}

export const SidebarAdmin = addRefProps(SidebarAdminBase)