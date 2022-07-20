import { FormikHelpers } from 'formik'

export interface IControllerCoreHandleSubmit<
  InputType = unknown,
  OutputType = void,
  HelperType extends FormikHelpers<InputType> = FormikHelpers<InputType>
> {
  handleSubmit(input: InputType, helpers?: HelperType): Promise<OutputType>
}