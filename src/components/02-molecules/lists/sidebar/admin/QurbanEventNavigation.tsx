import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

import Link from 'next/link'

import { addRefProps, PropsWithInnerRef } from "utils";
import { getMosqueID, getQurbanEventId } from 'state-management';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListSidebarAdminQurbanEventNavigationBaseProps
  extends PropsWithInnerRef<HTMLUListElement> {}

const ListSidebarAdminQurbanEventNavigationBase = <
  PropType extends ListSidebarAdminQurbanEventNavigationBaseProps = ListSidebarAdminQurbanEventNavigationBaseProps
>({ innerRef }: PropType) => {
  const router = useRouter()
  const mosqueId = useSelector(getMosqueID)
  const qurbanEventId = useSelector(getQurbanEventId)

  const linkClassName = (pathname: string) => clsx('text-xs uppercase py-3 font-bold flex', {
    'text-blue-600 hover:text-blue-700': router.pathname === pathname,
    'text-blueGray-700 hover:text-blueGray-500': router.pathname !== pathname
  })
  return (
    <>
      <hr className="my-4 md:min-w-full" />
      <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Qurban Event Navigation
      </h6>
      
      <ul
        ref={innerRef}
        className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]`)}>
              <i className="fas fa-tachograph-digital text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Overviews
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/qurban_registrations`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/qurban_registrations`)}>
              <i className="fas fa-calendar-days text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Qurban Registration
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/committees`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/committees`)}>
              <i className="fas fa-calendar-days text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Committees
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/citizens`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/citizens`)}>
              <i className="fas fa-people-group text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Citizens
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/reports`}>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/reports`)}>
              <i className="fas fa-people-group text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Reports
            </a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export const ListSidebarAdminQurbanEventNavigation = addRefProps<HTMLUListElement>(
  ListSidebarAdminQurbanEventNavigationBase
)