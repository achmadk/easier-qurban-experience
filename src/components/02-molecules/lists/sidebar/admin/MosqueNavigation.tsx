import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

import Link from 'next/link'

import { addRefProps, PropsWithInnerRef } from "utils";
import { getMosqueID } from 'state-management';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListSidebarAdminMosqueNavigationBaseProps
  extends PropsWithInnerRef<HTMLUListElement> {
  /**
   * @default 'MOSQUE'
   */
  navigationForPage?: 'MOSQUE' | 'QURBAN_EVENTS'
}

const ListSidebarAdminMosqueNavigationBase = <
  PropType extends ListSidebarAdminMosqueNavigationBaseProps = ListSidebarAdminMosqueNavigationBaseProps
>({
  innerRef,
  navigationForPage = 'MOSQUE'
}: PropType) => {
  const router = useRouter()
  const mosqueId = useSelector(getMosqueID)

  const linkClassName = (pathname: string) => clsx('text-xs uppercase py-3 font-bold flex', {
    'text-blue-600 hover:text-blue-700': router.pathname === pathname,
    'text-blueGray-700 hover:text-blueGray-500': router.pathname !== pathname
  })
  return (
    <>
      <hr className="my-4 md:min-w-full" />
      <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Mosque Navigation
      </h6>
      
      <ul
        ref={innerRef}
        className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]`)}>
              <i className="fas fa-tachograph-digital text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Dashboard
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events`)}>
              <i className="fas fa-calendar-days text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              {`${navigationForPage === 'QURBAN_EVENTS' ? 'All ' : ''}Qurban Events`}
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/citizens`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/citizens`)}>
              <i className="fas fa-people-group text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              {`${navigationForPage === 'QURBAN_EVENTS' ? 'Mosque ' : ''}Citizens`}
            </a>
          </Link>
        </li>
        {/**
         * @todo add mosque profile feature
         */}
        {/* <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/profile`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/profile`)}>
              <i className="fas fa-place-of-worship text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Mosque Profile
            </a>
          </Link>
        </li> */}

      </ul>
    </>
  )
}

export const ListSidebarAdminMosqueNavigation = addRefProps<
  HTMLUListElement, ListSidebarAdminMosqueNavigationBaseProps
>(ListSidebarAdminMosqueNavigationBase)