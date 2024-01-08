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
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}`} legacyBehavior>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]`)}>
              <i className="fas fa-tachograph-digital text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Overviews
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/citizens`} legacyBehavior>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/citizens`)}>
              <i className="fas fa-people-group text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Qurban Citizens
            </a>
          </Link>
        </li>
        <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/qurban_registrations`} legacyBehavior>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/qurban_registrations`)}>
              <i className="fab fa-wpforms text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Qurban Registration
            </a>
          </Link>
        </li>
        {/**
          * @todo uncomment those codes in order to provide link
          * to qurban committees page when ready
          * <-- [START] -->
          */}
        {/* <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/committees`} legacyBehavior>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/committees`)}>
              <i className="fas fa-people-line text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Committees
            </a>
          </Link>
        </li> */}
        {/** <-- [END] --> */}
        {/* <li className="items-center">
          <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/reports`} legacyBehavior>
            <a
              className={linkClassName(`/admin/mosques/[mosqueId]/events/[qurbanEventId]/reports`)}>
              <i className="fas fa-chart-column text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
              Reports
            </a>
          </Link>
        </li> */}
      </ul>
    </>
  )
}

export const ListSidebarAdminQurbanEventNavigation = addRefProps<HTMLUListElement>(
  ListSidebarAdminQurbanEventNavigationBase
)