export interface IControllerCoreGetResourceData<
  DataType = unknown,
  GetDataOptionsType = unknown,
  GetDataReturnType = Promise<void>
> {
  data: DataType | null
  getData(options?: GetDataOptionsType): GetDataReturnType
}