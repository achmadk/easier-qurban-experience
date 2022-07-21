import { container } from 'inversify-hooks-esm'
import { useState } from 'react'
import { AxiosInstance } from 'axios'

import { useControllerMosqueFindTransformRequestBodyClient } from './transform-request-body'

import { SERVICE_CORE_REMOTE_BASE } from 'services'

import { IMosqueBase } from 'models'
import { IControllerCoreGetResourceDataWithLoading } from 'controllers/core'

export const CONTROLLER_MOSQUE_ADMIN_FIND_GET_RESOURCE_DATA_CLIENT =
  'ControllerMosqueAdminFindGetResourceDataClient'

export function useControllerMosqueAdminFindGetResourceDataClient<
  DataType extends IMosqueBase = IMosqueBase
>(): IControllerCoreGetResourceDataWithLoading<DataType[], never, Promise<DataType[]>> {
  const [data, setData] = useState<DataType[] | null>(null)
  const [loading, setLoading] = useState(false)

  const { transformRequestBody } = useControllerMosqueFindTransformRequestBodyClient()
  const remoteService = container.get<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const getData = async () => {
    setLoading(true)
    try {
      const query = await transformRequestBody(null)
      const response = await remoteService.get<{ data: DataType[] }>('/mosques', { params: { query }})
      const mosques = response.data?.data ?? []
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