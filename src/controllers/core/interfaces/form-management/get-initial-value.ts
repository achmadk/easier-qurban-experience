export interface IControllerCoreGetInitialValue<
  OutputType = unknown,
  InputType = unknown,
  OptionsType = unknown
> {
  getInitialValue(input?: InputType, options?: OptionsType): OutputType
}