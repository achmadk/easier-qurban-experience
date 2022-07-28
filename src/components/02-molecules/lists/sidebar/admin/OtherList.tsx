import Link from 'next/link'

import { addRefProps, PropsWithInnerRef } from "utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListSidebarAdminOtherListBaseProps
  extends PropsWithInnerRef<HTMLUListElement> {}

const ListSidebarAdminOtherListBase = <
  PropType extends ListSidebarAdminOtherListBaseProps = ListSidebarAdminOtherListBaseProps
>({ innerRef }: PropType) => {
  return (
    <>
      <hr className="my-4 md:min-w-full" />
      <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Other Navigation
      </h6>
      
      <ul
        ref={innerRef}
        className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        <li className="items-center">
            <Link href="/admin/home">
              <a
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                <i className="fas fa-home text-blueGray-300 mr-2 text-sm" />
                Back To Home
              </a>
            </Link>
        </li>

      </ul>
    </>
  )
}

export const ListSidebarAdminOtherList = addRefProps<HTMLUListElement>(
  ListSidebarAdminOtherListBase
)