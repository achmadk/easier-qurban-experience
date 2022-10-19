export interface IControllerCoreGetValidator<
  OutputType = unknown,
  InputType = unknown
> {
  getValidator(input?: InputType): OutputType
}
