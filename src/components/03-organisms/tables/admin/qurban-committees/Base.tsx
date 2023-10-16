import { useMemo } from 'react'
/**
 * @todo uncomment those codes in order to provide link
 * to qurban committees page when ready
 */
// <-- [START] -->
// import { useSelector } from 'react-redux';

// import Link from 'next/link'

// import { getMosqueID, getQurbanEventId } from 'state-management';
// <-- [END] -->

import { addRefProps, PropsWithInnerRef } from "utils";
import { IUserWithID } from 'models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminQurbanCommitteesBaseProps<
  DataType extends IUserWithID = IUserWithID
>
  extends PropsWithInnerRef {
  data?: DataType[] | null
}

const TableAdminQurbanCommitteesBase = <
  DataType extends IUserWithID = IUserWithID,
  PropType extends TableAdminQurbanCommitteesBaseProps<DataType> = TableAdminQurbanCommitteesBaseProps<DataType>
>({ innerRef, data: committeeData = null }: PropType) => {
  /**
   * @todo uncomment those codes in order to provide link
   * to qurban committees page when ready
   */
  // <-- [START] -->
  // const mosqueId = useSelector(getMosqueID)
  // const qurbanEventId = useSelector(getQurbanEventId)
  // <-- [END] -->

  const emptyData: DataType[] = useMemo(() => ([
    {
      name: null,
      email: null,
      phoneNumber: null
    }
  ] as unknown as DataType[]), [])
  const usedData = committeeData && committeeData?.length > 0 ? committeeData : emptyData

  return (
    <div ref={innerRef} className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Qurban Committees
              </h3>
            </div>
            {/**
             * @todo provide link to qurban committees when ready
             */}
            {/* <div
              className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                href={`/admin/mosques/${mosqueId}/events/${qurbanEventId}/committees`} legacyBehavior>
                <a
                  className="bg-blue-600 text-white active:bg-blue-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  Manage
                </a>
              </Link>
            </div> */}
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
                  Roles
                </th>
              </tr>
            </thead>
            <tbody>
              {usedData
                .slice(0, 10)
                .map((item, index) => (
                <tr key={`qurban-committee-item-${index}`}>
                  <th
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item?.name ?? '-'}
                  </th>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item?.role?.name ?? '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {usedData.length > 10 && (
          <div className="rounded-b mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div
                className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  {`and ${usedData.length - 10} items more`}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const TableAdminQurbanCommittees = addRefProps(
  TableAdminQurbanCommitteesBase
)
