import { useSelector } from "react-redux"

import { getMosqueID } from "state-management"

import { IControllerCoreTransformRequestBody, useControllerCoreEncryptionTransformRequestBodyBaseClient } from "controllers"
import { ICitizenBase } from "models/user/citizen"

export interface DefaultCitizenAdminCreateManyRequestBody<
  CitizenType extends ICitizenBase = ICitizenBase
> {
  mosqueId: string
  citizens: CitizenType[]
}

export function useControllerCitizenAdminCreateManyTransformRequestBodyClient<
  InputType extends ICitizenBase = ICitizenBase,
  TransformedType extends DefaultCitizenAdminCreateManyRequestBody<InputType> = DefaultCitizenAdminCreateManyRequestBody<InputType>
>(): IControllerCoreTransformRequestBody<InputType[], Promise<string>> {
  const mosqueId = useSelector(getMosqueID)
  const { transformRequestBody: encryptRequestBody } =
    useControllerCoreEncryptionTransformRequestBodyBaseClient<TransformedType>()

  const transformRequestBody = async (input: InputType[]) => {
    const payload: TransformedType = {
      mosqueId,
      citizens: input
    } as TransformedType
    return await encryptRequestBody(payload)
  }

  return {
    transformRequestBody
  }
}