import { type MouseEvent } from 'react'
import { container } from 'inversify-hooks-esm'
import { useUser } from '@clerk/nextjs'
import { createPopper } from '@popperjs/core'
import { useSelector } from 'react-redux'

import Image from 'next/image'
import Link from 'next/link'

import { CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT, IControllerCoreLogout } from 'controllers'
import { getMosqueID, getMosqueName } from 'state-management'

import { addRefProps, PropsWithInnerRef } from "utils"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderMosqueBaseProps extends PropsWithInnerRef<HTMLElement> {
  /**
   * @default 'DASHBOARD'
   */
  headerType?: 'DASHBOARD' | 'CITIZENS' | 'EVENTS'
}

const HeaderMosqueBase = <
  PropType extends HeaderMosqueBaseProps = HeaderMosqueBaseProps
>({ innerRef, headerType = 'DASHBOARD' }: PropType) => {
  const { user } = useUser()
  const mosqueId = useSelector(getMosqueID)
  const mosqueName = useSelector(getMosqueName)

  const logoutCtrl = container.get<IControllerCoreLogout>(
    CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT
  )

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
    <nav ref={innerRef}
        className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
          <div
            className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            <div className="flex items-center" style={{ columnGap: '0.5rem' }}>
              <Link href={`/admin/mosques/${mosqueId}`}>
                <a
                  className="text-sm text-white uppercase hidden lg:inline-block font-semibold hover:underline">
                  {`${mosqueName ?? '-'}${headerType === 'DASHBOARD' ? ` - Dashboard` : ''}`}
                </a>
              </Link>
              {headerType !== 'DASHBOARD' && (
                <span className="text-white">
                  <i className="fas fa-arrow-right" />
                </span>
              )}
              {headerType === 'CITIZENS' && (
                <Link href={`/admin/mosques/${mosqueId}/citizens`}>
                  <a
                    className="text-sm text-white uppercase hidden lg:inline-block font-semibold hover:underline">
                    Citizens
                  </a>
                </Link>
              )}
              {headerType === 'EVENTS' && (
                <Link href={`/admin/mosques/${mosqueId}/events`}>
                  <a
                    className="text-sm text-white uppercase hidden lg:inline-block font-semibold hover:underline">
                    Events
                  </a>
                </Link>
              )}
            </div>
            <ul
              className="flex-col list-none items-center hidden md:flex">
              <a
                className="text-blueGray-500 block"
                onClick={toggleDropdown('user-dropdown')}>
                <div className="items-center flex">
                  <span
                    className="w-12 h-12 relative text-sm bg-blueGray-200 inline-flex items-center justify-center rounded-full cursor-pointer">
                    <Image
                      alt={`${user.fullName} Profile Image URL`}
                      className="w-full rounded-full align-middle border-none shadow-lg"
                      src={user.profileImageUrl}
                      layout='fill'
                      priority
                    />
                  </span>
                </div>
              </a>
              <div
                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                id="user-dropdown">
                <a
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
                  onClick={logoutCtrl.logout}>
                  Logout
                </a>
              </div>
            </ul>
          </div>
        </nav>
  )
}

export const HeaderMosque = addRefProps<HTMLElement, HeaderMosqueBaseProps>(HeaderMosqueBase)