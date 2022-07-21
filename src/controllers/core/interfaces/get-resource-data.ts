export interface IControllerCoreGetResourceData<
  DataType = unknown,
  GetDataOptionsType = unknown,
  GetDataReturnType = Promise<void>
> {
  data: DataType | null
  getData(options?: GetDataOptionsType): GetDataReturnType
}

export interface IControllerCoreGetResourceDataOnlyLoading {
  loading: boolean
}

export interface IControllerCoreGetResourceDataWithLoading<
  DataType = unknown,
  GetDataOptionsType = unknown,
  GetDataReturnType = Promise<void>
> extends IControllerCoreGetResourceData<DataType, GetDataOptionsType, GetDataReturnType>,
  IControllerCoreGetResourceDataOnlyLoading {}