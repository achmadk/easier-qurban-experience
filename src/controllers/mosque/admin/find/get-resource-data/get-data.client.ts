import { container } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { useControllerMosqueFindTransformRequestBodyClient } from '../transform-request-body'

import { SERVICE_CORE_REMOTE_BASE } from 'services'

import { IMosqueWithID } from 'models'
import { IControllerCoreGetResourceDataOnlyFunction } from 'controllers/core'
import { setMosqueData } from 'state-management/slices'
import { checkMosqueDataEmpty } from 'state-management'

export interface DefaultMosqueAdminFindGetDataClientOptions {
  mosqueId?: string | null
}

export function useControllerMosqueAdminFindGetDataClient<
  OptionsType extends DefaultMosqueAdminFindGetDataClientOptions = DefaultMosqueAdminFindGetDataClientOptions,
  DataType extends IMosqueWithID = IMosqueWithID
>(): IControllerCoreGetResourceDataOnlyFunction<OptionsType | null | undefined, Promise<DataType[]>> {
  const dispatch = useDispatch()
  const isMosqueDataEmpty = useSelector(checkMosqueDataEmpty)

  const { transformRequestBody } = useControllerMosqueFindTransformRequestBodyClient()
  const remoteService = container.get<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const getData = async (options?: OptionsType | null) => {
    const mosqueId = options?.mosqueId ?? null
    try {
      const query = await transformRequestBody(options)
      const response = await remoteService.get<{ data: DataType[] }>('/mosques', { params: { query }})
      const mosques = response.data?.data ?? []
      if (mosqueId && isMosqueDataEmpty) {
        dispatch(setMosqueData(mosques[0]))
        return [mosques[0]]
      }
      return mosques
    } catch {
      return []
    }
  }

  return {
    getData,
  }
}