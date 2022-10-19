export interface IControllerCoreTransformRequestBody<
  InputType = unknown,
  OutputType = unknown,
  OptionsType = unknown
> {
  transformRequestBody(input: InputType, options?: OptionsType): OutputType
}