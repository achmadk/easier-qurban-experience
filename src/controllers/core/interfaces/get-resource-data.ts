export interface IControllerCoreGetResourceDataOnlyFunction<
  GetDataOptionsType = unknown,
  GetDataReturnType = Promise<void>
> {
  getData(options?: GetDataOptionsType): GetDataReturnType
}

export interface IControllerCoreGetResourceData<
  DataType = unknown,
  GetDataOptionsType = unknown,
  GetDataReturnType = Promise<void>
> extends IControllerCoreGetResourceDataOnlyFunction<GetDataOptionsType, GetDataReturnType> {
  data: DataType | null
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