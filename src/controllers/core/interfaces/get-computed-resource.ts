export interface IControllerCoreGetComputedResource<
  OutputType = unknown,
  InputType = unknown,
  OptionsType = unknown
> {
  getComputedResource(input?: InputType, options?: OptionsType): OutputType
}
