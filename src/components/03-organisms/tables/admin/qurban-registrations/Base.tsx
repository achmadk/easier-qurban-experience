import { type HTMLAttributes, useMemo } from 'react'
/**
 * @todo add link to qurban registration if the page is ready
 */
import { useSelector } from "react-redux"

import Link from 'next/link'

import { getMosqueID, getQurbanEventId } from "state-management"

import { addRefProps, PropsWithInnerRef } from "utils"
import { IModelQurbanRegistrationWithID } from 'models'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminQurbanRegistrationBaseProps<
  DataType extends IModelQurbanRegistrationWithID = IModelQurbanRegistrationWithID
>
  extends PropsWithInnerRef {
  containerProps?: HTMLAttributes<HTMLDivElement>
  data?: DataType[] | null
}

const TableAdminQurbanRegistrationBase = <
  DataType extends IModelQurbanRegistrationWithID = IModelQurbanRegistrationWithID,
  PropType extends TableAdminQurbanRegistrationBaseProps<DataType> = TableAdminQurbanRegistrationBaseProps<DataType>
>({
  innerRef,
  containerProps = { className: 'w-full xl:w-7/12 px-4' },
  data = null
}: PropType) => {
  /**
   * @todo add link to qurban registration if the page is ready
   */
  const mosqueId = useSelector(getMosqueID)
  const qurbanEventId = useSelector(getQurbanEventId)

  const emptyData = useMemo(() => ([{
    id: null,
    qurbanEventId: null,
  }] as unknown as DataType[]), [])

  const usedData = data && data?.length > 0 ? data : emptyData

  return (
    <div ref={innerRef} {...containerProps}>
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Qurban Registration
              </h3>
            </div>
            {/**
             * @todo add link to qurban registration if the page is ready
             */}
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/qurban_registrations`} legacyBehavior>
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
            className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th
                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Sacrificial Animal
                </th>
                <th
                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {`Participant(s)`}
                </th>
              </tr>
            </thead>
            <tbody>
              {usedData.map((data, index) => (
                  <tr key={`qurban-registration-list-${index}`} className="cursor-pointer">
                    <th
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {data?.sacrificialAnimal?.name ?? '-'}
                    </th>
                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {data?.participants?.map(({ name }) => name)?.join(', ') ?? '-'}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const TableAdminQurbanRegistration = addRefProps(
  TableAdminQurbanRegistrationBase
)
