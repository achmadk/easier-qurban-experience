import { useState } from 'react'

import { IMosqueWithID } from 'models'
import { IControllerCoreGetResourceDataWithLoading } from 'controllers/core'
import { DefaultMosqueAdminFindGetDataClientOptions, useControllerMosqueAdminFindGetDataClient } from './get-data.client'

export const CONTROLLER_MOSQUE_ADMIN_FIND_GET_RESOURCE_DATA_CLIENT =
  'ControllerMosqueAdminFindGetResourceDataClient'

export function useControllerMosqueAdminFindGetResourceDataClient<
  DataType extends IMosqueWithID = IMosqueWithID,
  OptionsType extends DefaultMosqueAdminFindGetDataClientOptions = DefaultMosqueAdminFindGetDataClientOptions
>(): IControllerCoreGetResourceDataWithLoading<DataType[], never, Promise<DataType[]>> {
  const [data, setData] = useState<DataType[] | null>(null)
  const [loading, setLoading] = useState(false)

  const mosqueCtrl = useControllerMosqueAdminFindGetDataClient<OptionsType, DataType>()

  const getData = async () => {
    setLoading(true)
    try {
      const mosques = await mosqueCtrl.getData()
      setData(mosques)
      return mosques
    } catch {
      setData([])
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    getData,
    loading,
  }
}