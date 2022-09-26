import { useContainerGet } from 'inversify-hooks-esm'
import { useState } from "react";
import { useSelector } from "react-redux";
import { AxiosInstance } from 'axios';

import {
  IControllerCoreGetResourceData,
  useControllerCoreEncryptionTransformRequestBodyBaseClient
} from "controllers";
import { getQurbanEventId } from "state-management";

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { ICitizenWithID } from "models/user/citizen";

export function useControllerQurbanCitizenAdminFindGetResourceDataClient<
  DataType extends ICitizenWithID = ICitizenWithID
>(): IControllerCoreGetResourceData<DataType[], string | null | undefined> {
  const [data, setData] = useState<DataType[] | null>(null)
  const { transformRequestBody: encryptRequestBody }
    = useControllerCoreEncryptionTransformRequestBodyBaseClient()

  const fallbackQurbanEventId = useSelector(getQurbanEventId)

  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const getData = async (qurbanEventId = fallbackQurbanEventId) => {
    const query = await encryptRequestBody({ qurbanEventId })
    const response = await remoteService.get<{ data: DataType[] }>('/qurban_citizens', { params: { query }})
    const data = response?.data?.data ?? []
    setData(data)
  }

  return {
    data,
    getData
  }
}