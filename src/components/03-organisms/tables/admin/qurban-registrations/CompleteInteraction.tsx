import { useContext, useMemo } from 'react'

import { ContextPageQurbanRegistrations } from 'contexts'

import { addRefProps, PropsWithInnerRef } from "utils"
import { IModelQurbanRegistrationWithID } from 'models'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminQurbanRegistrationCompleteInteractionBaseProps
  extends PropsWithInnerRef {
}

const TableAdminQurbanRegistrationCompleteInteractionBase = <
  DataType extends IModelQurbanRegistrationWithID = IModelQurbanRegistrationWithID,
  PropType extends TableAdminQurbanRegistrationCompleteInteractionBaseProps = TableAdminQurbanRegistrationCompleteInteractionBaseProps
>({ innerRef }: PropType) => {
  const { toggleMode, qurbanRegistrationsData, setSelectedQurbanRegistrationData } = useContext(ContextPageQurbanRegistrations)
  const emptyData = useMemo(() => ([{
    id: null,
    participants: []
  }] as unknown as DataType[]), [])

  const usedData = (qurbanRegistrationsData && qurbanRegistrationsData?.length > 0 ? qurbanRegistrationsData : emptyData) as DataType[]

  const handleButtonAddClicked = () =>
    toggleMode('CREATE')

  const handleTableItemClicked = (data: DataType) => () => {
    if (data.id !== null) {
      toggleMode('UPDATE')
      setSelectedQurbanRegistrationData(data)
    }
  }

  return (
    <div ref={innerRef} className="w-full px-4">
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Qurban Registrations
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
                <tr
                  key={`qurban-registration-item-${index}`}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={handleTableItemClicked(data)}>
                  <th
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {data?.sacrificialAnimal?.name ?? '-'}
                  </th>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {data?.participants?.map((item) => item.name)?.join(', ') ?? '-'}
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

export const TableAdminQurbanRegistrationCompleteInteraction = addRefProps(
  TableAdminQurbanRegistrationCompleteInteractionBase
)
