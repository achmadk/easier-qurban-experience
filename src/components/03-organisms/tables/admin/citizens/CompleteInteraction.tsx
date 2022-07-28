
// import { useSelector } from 'react-redux';
import { ContextPageAdminCitizens } from 'contexts';
import { useContext, useMemo } from 'react'

// import { getMosqueID } from 'state-management';

import { addRefProps, PropsWithInnerRef } from "utils";
import { IUserBase } from 'models';
import { useControllerCitizenAdminCreateManyHandleSubmitClient } from 'controllers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminCitizensCompleteInteractionBaseProps
  extends PropsWithInnerRef {}

const TableAdminCitizensCompleteInteractionBase = <
  PropType extends TableAdminCitizensCompleteInteractionBaseProps = TableAdminCitizensCompleteInteractionBaseProps
>({ innerRef }: PropType) => {
    const {
      isAddBatch,
      setIsAddBatch,
      addedCitizens,
      setAddedCitizens,
      setTriggerReloadMosqueData,
      citizenData,
    } = useContext(ContextPageAdminCitizens)

    const { handleSubmit: handleAddManyCitizens } = useControllerCitizenAdminCreateManyHandleSubmitClient()
//   const mosqueId = useSelector(getMosqueID)

  const emptyData: IUserBase[] = useMemo(() => ([
    {
      name: null,
      email: null,
      phoneNumber: null
    }
  ]), [])
  const usedData = isAddBatch
    ? addedCitizens
    : citizenData?.length > 0 ? citizenData : emptyData

  const handleAddBatchButtonClicked = () =>
    setIsAddBatch(true)
  const handleCancelAddBatchButtonClicked = () => {
    setAddedCitizens([])
    setIsAddBatch(false)
  }
  const handleAddManyCitizensButtonClicked = async () => {
    try {
      await handleAddManyCitizens(addedCitizens)
    } finally {
      handleCancelAddBatchButtonClicked()
      setTriggerReloadMosqueData(true)
    }
  }

  return (
    <div ref={innerRef} className="w-full mb-12 xl:mb-0 px-4">
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                {isAddBatch ? 'Added Citizens' : 'Citizens'}
              </h3>
            </div>
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              {!isAddBatch && (
                <button
                  type="button"
                  className="bg-blue-600 text-white active:bg-blue-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={handleAddBatchButtonClicked}>
                  Add Batch
                </button>
              )}
              {isAddBatch && (
                <>
                  <button
                    type="button"
                    className="bg-blue-600 text-white active:bg-blue-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={handleAddManyCitizensButtonClicked}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className="bg-white text-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={handleCancelAddBatchButtonClicked}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table
            className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Full name
                </th>
                <th
                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email address
                </th>
                <th
                  className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Phone number
                </th>
              </tr>
            </thead>
            <tbody>
              {usedData.map((item, index) => (
                <tr key={`citizen-item-${index}`}>
                  <th
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item?.name ?? '-'}
                  </th>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item?.email ?? '-'}
                  </td>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item?.phoneNumber ?? '-'}
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

export const TableAdminCitizensCompleteInteraction = addRefProps(
  TableAdminCitizensCompleteInteractionBase
)