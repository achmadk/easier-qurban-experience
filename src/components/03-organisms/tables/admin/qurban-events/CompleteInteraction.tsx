import { useContext, useMemo } from 'react'
import { useDispatch } from "react-redux"

import Link from 'next/link'

import { ContextPageQurbanEvents } from 'contexts'

import { setQurbanEventData } from "state-management"

import { addRefProps, PropsWithInnerRef } from "utils"
import { IModelQurbanEventWithID } from 'models'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminQurbanEventCompleteInteractionBaseProps
  extends PropsWithInnerRef {
}

const TableAdminQurbanEventCompleteInteractionBase = <
  DataType extends IModelQurbanEventWithID = IModelQurbanEventWithID,
  PropType extends TableAdminQurbanEventCompleteInteractionBaseProps = TableAdminQurbanEventCompleteInteractionBaseProps
>({ innerRef }: PropType) => {
  const dispatch = useDispatch()
  const { toggleMode, qurbanEventsData } = useContext(ContextPageQurbanEvents)
  const emptyData = useMemo(() => ([{
    id: null,
    yearExecution: null
  }] as DataType[]), [])

  const usedData = qurbanEventsData?.length > 0 ? qurbanEventsData : emptyData

  const handleButtonAddClicked = () =>
    toggleMode('CREATE')
  const handleTableItemClicked = (data: DataType) => () =>
    dispatch(setQurbanEventData(data))

  return (
    <div ref={innerRef} className="w-full px-4">
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
              <button
                type="button"
                className="bg-blue-600 text-white active:bg-blue-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={handleButtonAddClicked}>
                Add
              </button>
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
                <Link key={`qurban-event-${index}`} href={`/admin/mosques/${data.mosqueId}/events/${data.id}`} legacyBehavior>
                  <tr className='cursor-pointer hover:text-blue-600' onClick={handleTableItemClicked(data as DataType)}>
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

export const TableAdminQurbanEventCompleteInteraction = addRefProps(
  TableAdminQurbanEventCompleteInteractionBase
)