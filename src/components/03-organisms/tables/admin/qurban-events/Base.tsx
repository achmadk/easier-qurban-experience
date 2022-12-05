import { type HTMLAttributes, useMemo } from 'react'
import { useSelector, useDispatch } from "react-redux"

import Link from 'next/link'

import { getMosqueID, setQurbanEventData } from "state-management"

import { addRefProps, PropsWithInnerRef } from "utils"
import { IModelQurbanEventWithID } from 'models'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminQurbanEventBaseProps<
  DataType extends IModelQurbanEventWithID = IModelQurbanEventWithID
>
  extends PropsWithInnerRef {
  containerProps?: HTMLAttributes<HTMLDivElement>
  data?: DataType[] | null
}

const TableAdminQurbanEventBase = <
  DataType extends IModelQurbanEventWithID = IModelQurbanEventWithID,
  PropType extends TableAdminQurbanEventBaseProps<DataType> = TableAdminQurbanEventBaseProps<DataType>
>({
  innerRef,
  containerProps = { className: 'w-full xl:w-5/12 px-4' },
  data = null
}: PropType) => {
  const dispatch = useDispatch()
  const mosqueId = useSelector(getMosqueID)
  const emptyData = useMemo(() => ([{
    id: null,
    yearExecution: null
  }] as DataType[]), [])

  const usedData = data?.length > 0 ? data : emptyData

  const handleTableItemClicked = (data: DataType) => () =>
    dispatch(setQurbanEventData(data))

  return (
    <div ref={innerRef} {...containerProps}>
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Qurban Events
              </h3>
            </div>
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link href={`/admin/mosques/${mosqueId}/events`} legacyBehavior>
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
                  Year
                </th>
                <th
                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {usedData.map((data, index) => (
                <Link key={`qurban-event-list-${index}`} href={`/admin/mosques/${data.mosqueId}/events/${data.id}`} legacyBehavior>
                  <tr className="cursor-pointer hover:text-blue-600" onClick={handleTableItemClicked(data)}>
                    <th
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {data?.yearExecution ?? '-'}
                    </th>
                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {data?.description ?? '-'}
                    </td>
                  </tr>
                </Link>
              ))}
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