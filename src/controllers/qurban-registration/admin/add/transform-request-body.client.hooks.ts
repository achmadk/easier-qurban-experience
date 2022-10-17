import { IControllerCoreTransformRequestBody, useControllerCoreEncryptionTransformRequestBodyBaseClient } from "controllers"
import { IModelQurbanRegistrationRequestBody } from "models"

export function useControllerQurbanRegistrationAdminAddTransformRequestBodyClient<
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody
>(): IControllerCoreTransformRequestBody<InputType, Promise<string>> {
  const { transformRequestBody: encryptRequestBody } =
    useControllerCoreEncryptionTransformRequestBodyBaseClient<InputType>()

  const transformRequestBody = async (input: InputType) => {
    return await encryptRequestBody(input)
  }

  return {
    transformRequestBody
  }
}