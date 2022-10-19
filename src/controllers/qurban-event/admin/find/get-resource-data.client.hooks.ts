import { useContainerGet } from 'inversify-hooks-esm'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from 'axios';

import {
  IControllerCoreGetResourceData,
  useControllerCoreEncryptionTransformRequestBodyBaseClient
} from "controllers";
import { checkQurbanEventDataEmpty, getMosqueID, getQurbanEventId, setQurbanEventData } from "state-management";

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { IModelQurbanEventWithID } from 'models';

export interface DefaultQurbanEventAdminFindGetResourceDataClientOption {
  mosqueId?: string
  qurbanEventId?: string
}

export function useControllerQurbanEventAdminFindGetResourceDataClient<
  DataType extends IModelQurbanEventWithID = IModelQurbanEventWithID,
  OptionType extends DefaultQurbanEventAdminFindGetResourceDataClientOption = DefaultQurbanEventAdminFindGetResourceDataClientOption
>(): IControllerCoreGetResourceData<DataType[], OptionType> {
  const [data, setData] = useState<DataType[] | null>(null)
  const dispatch = useDispatch()
  const { transformRequestBody: encryptRequestBody }
    = useControllerCoreEncryptionTransformRequestBodyBaseClient()

  const fallbackMosqueId = useSelector(getMosqueID)
  const fallbackQurbanEventId = useSelector(getQurbanEventId)
  const qurbanEventDataIsEmpty = useSelector(checkQurbanEventDataEmpty)

  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const getData = async (options: OptionType) => {
    const mosqueId = options?.mosqueId ?? fallbackMosqueId
    const qurbanEventId = options?.qurbanEventId ?? fallbackQurbanEventId ?? null
    const query = await encryptRequestBody({ mosqueId })
    const response = await remoteService.get<{ data: DataType[] }>('/qurban_events', { params: { query }})
    const data = response?.data?.data ?? []
    if (qurbanEventId && qurbanEventDataIsEmpty) {
      const selectedQurbanEventData = data?.find((item) =>
        item.id === qurbanEventId
      ) ?? null
      dispatch(setQurbanEventData(selectedQurbanEventData))
    }
    setData(data)
  }

  return {
    data,
    getData
  }
}