import { useSelector } from 'react-redux';
import { useMemo } from 'react'

import Link from 'next/link'

import { getMosqueID } from 'state-management';

import { addRefProps, PropsWithInnerRef } from "utils";
import { IUserBase } from 'models';
import { ICitizenWithID } from 'models/user/citizen';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableAdminCitizensBaseProps<
  DataType extends ICitizenWithID = ICitizenWithID
>
  extends PropsWithInnerRef {
  data?: DataType[] | null
}

const TableAdminCitizensBase = <
  DataType extends ICitizenWithID = ICitizenWithID,
  PropType extends TableAdminCitizensBaseProps<DataType> = TableAdminCitizensBaseProps<DataType>
>({ innerRef, data: citizenData = null }: PropType) => {
  const mosqueId = useSelector(getMosqueID)

  const emptyData: IUserBase[] = useMemo(() => ([
    {
      name: null,
      email: null,
      phoneNumber: null
    }
  ]), [])
  const usedData = citizenData?.length > 0 ? citizenData : emptyData

  return (
    <div ref={innerRef} className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Citizens
              </h3>
            </div>
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                href={`/admin/mosques/${mosqueId}/citizens`} legacyBehavior>
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
              {usedData
                .slice(0, 10)
                .map((item, index) => (
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

export const TableAdminCitizens = addRefProps(
  TableAdminCitizensBase
)