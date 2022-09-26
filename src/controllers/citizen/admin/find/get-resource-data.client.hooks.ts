import { useContainerGet } from 'inversify-hooks-esm'
import { useState } from "react";
import { useSelector } from "react-redux";
import { AxiosInstance } from 'axios';

import {
  IControllerCoreGetResourceData,
  useControllerCoreEncryptionTransformRequestBodyBaseClient
} from "controllers";
import { getMosqueID } from "state-management";

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { ICitizenWithID } from "models/user/citizen";

export function useControllerCitizenAdminFindGetResourceDataClient<
  DataType extends ICitizenWithID = ICitizenWithID
>(): IControllerCoreGetResourceData<DataType[], string | null | undefined> {
  const [data, setData] = useState<DataType[] | null>(null)
  const { transformRequestBody: encryptRequestBody }
    = useControllerCoreEncryptionTransformRequestBodyBaseClient()

  const fallbackMosqueId = useSelector(getMosqueID)

  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const getData = async (mosqueId = fallbackMosqueId) => {
    const query = await encryptRequestBody({ mosqueId })
    const response = await remoteService.get<{ data: DataType[] }>('/citizens', { params: { query }})
    const data = response?.data?.data ?? []
    setData(data)
  }

  return {
    data,
    getData
  }
}