import Image from 'next/image'
import Link from 'next/link'

import { addRefProps, PropsWithInnerRef } from "utils"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderMosqueBaseProps extends PropsWithInnerRef<HTMLElement> {

}

const HeaderMosqueBase = <PropType extends HeaderMosqueBaseProps = HeaderMosqueBaseProps>({ innerRef }: PropType) => {
  return (
    <nav ref={innerRef}
        className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
          <div
            className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            <Link href={`/admin/mosques/test`}>
              <a
                className="text-sm text-white uppercase hidden lg:inline-block font-semibold">
                Dashboard
              </a>
            </Link>
            <form
              className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch">
                <span
                  className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search" />
                </span>
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                />
              </div>
            </form>
            <ul
              className="flex-col md:flex-row list-none items-center hidden md:flex">
              <a
                className="text-blueGray-500 block"
                href="#pablo"
              >
                <div className="items-center flex">
                  <span
                    className="w-12 h-12 relative text-sm bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                    <Image
                      alt="..."
                      className="w-full rounded-full align-middle border-none shadow-lg"
                      src="/assets/img/team-1-800x800.jpg"
                      layout='fill'
                      priority
                    />
                  </span>
                </div>
              </a>
              <div
                className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                id="user-dropdown"
              >
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  >Action</a
                ><a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  >Another action</a
                ><a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  >Something else here</a
                >
                <div
                  className="h-0 my-2 border border-solid border-blueGray-100"
                ></div>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                  >Seprated link</a
                >
              </div>
            </ul>
          </div>
        </nav>
  )
}

export const HeaderMosque = addRefProps(HeaderMosqueBase)