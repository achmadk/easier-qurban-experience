import { container } from 'inversify-hooks-esm'
import { useState } from "react";
import { AxiosInstance } from 'axios';

import {
  IControllerCoreGetResourceData,
} from "controllers";

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { IModelSacrificialAnimalWithId } from 'models';

export function useControllerSacrificialAnimalSharedGetResourceDataClient<
  DataType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId
>(): IControllerCoreGetResourceData<DataType[], null | undefined> {
  const [data, setData] = useState<DataType[] | null>(null)

  const remoteService = container.get<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const getData = async () => {
    const response = await remoteService.get<{ data: DataType[] }>('/sacrificial_animals')
    const data = response?.data?.data ?? []
    setData(data)
  }

  return {
    data,
    getData
  }
}