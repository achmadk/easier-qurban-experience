import { useSelector } from "react-redux"

import Link from 'next/link'

import { getMosqueID } from "state-management"

import { addRefProps, PropsWithInnerRef } from "utils"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminQurbanEventBaseProps
  extends PropsWithInnerRef {}

const TableAdminQurbanEventBase = <
  PropType extends TableAdminQurbanEventBaseProps = TableAdminQurbanEventBaseProps
>({ innerRef }: PropType) => {
  const mosqueId = useSelector(getMosqueID)
  return (
    <div ref={innerRef} className="w-full xl:w-5/12 px-4">
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
              >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div
                      className="relative w-full px-4 max-w-full flex-grow flex-1"
                    >
                      <h3 className="font-semibold text-base text-blueGray-700">
                        Qurban Events
                      </h3>
                    </div>
                    <div
                      className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
                    >
                      <Link href={`/admin/mosques/${mosqueId}/events`}>
                      <a
                        className="bg-blue-600 text-white active:bg-blue-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        Manage
                      </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  <table
                    className="items-center w-full bg-transparent border-collapse"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th
                          className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        >
                          Year
                        </th>
                        <th
                          className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        >
                          Person Registered
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                        >
                          2022
                        </th>
                        <td
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          10
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  )
}

export const TableAdminQurbanEvent = addRefProps(
  TableAdminQurbanEventBase
)