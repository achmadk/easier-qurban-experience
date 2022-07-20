import { container } from 'inversify-hooks-esm'
import { useState } from 'react'
import { AxiosInstance } from 'axios'

import { useControllerMosqueFindTransformRequestBodyClient } from './transform-request-body'

import { SERVICE_CORE_REMOTE_BASE } from 'services'

import { IMosqueBase } from 'models'
import { IControllerCoreGetResourceData } from 'controllers/core'

export const CONTROLLER_MOSQUE_ADMIN_FIND_GET_RESOURCE_DATA_CLIENT =
  'ControllerMosqueAdminFindGetResourceDataClient'

export function useControllerMosqueAdminFindGetResourceDataClient<
  DataType extends IMosqueBase = IMosqueBase
>(): IControllerCoreGetResourceData<DataType[]> {
  const [data, setData] = useState<DataType[] | null>(null)

  const { transformRequestBody } = useControllerMosqueFindTransformRequestBodyClient()
  const remoteService = container.get<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const getData = async () => {
    try {
      const query = await transformRequestBody(null)
      console.log(query)
      const response = await remoteService.get<{ data: DataType[] }>('/mosques', { params: { query }})
      const mosques = response.data?.data ?? []
      setData(mosques)
    } catch {
      setData([])
    }
  }

  return {
    data,
    getData,
  }
}