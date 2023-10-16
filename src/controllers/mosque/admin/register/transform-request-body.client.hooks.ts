import { useUser } from "@clerk/nextjs";

import { IControllerCoreTransformRequestBody } from "controllers";

import { IMosqueBase, IMosqueWithUser } from "models";

export type IControllerMosqueAdminRegisterTransformRequestBodyClient<
  InputType extends IMosqueBase = IMosqueBase,
  OutputType extends IMosqueWithUser<InputType> = IMosqueWithUser<InputType>
> = IControllerCoreTransformRequestBody<InputType, OutputType>

export const CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT = 'ControllerMosqueAdminRegisterTransformRequestBodyClient'

export function useControllerMosqueAdminRegisterTransformRequestBodyClient<
  InputType extends IMosqueBase = IMosqueBase,
  OutputType extends IMosqueWithUser<InputType> = IMosqueWithUser<InputType>,
  ReturnType extends IControllerMosqueAdminRegisterTransformRequestBodyClient<InputType, OutputType> = IControllerMosqueAdminRegisterTransformRequestBodyClient<InputType, OutputType>
>(): ReturnType {
  const { user: clerkUser } = useUser()
  const transformRequestBody = (input: InputType): OutputType => {
    const user = {
      name: clerkUser?.fullName,
      image: clerkUser?.imageUrl,
      ...(clerkUser?.primaryEmailAddress?.emailAddress ? {
        email: clerkUser.primaryEmailAddress.emailAddress
      } : {}),
      ...(clerkUser?.primaryPhoneNumber?.phoneNumber ? {
        phoneNumber: clerkUser?.primaryPhoneNumber?.phoneNumber
      } : {})
    }
    return {
      ...input,
      user
    } as OutputType
  }
  return {
    transformRequestBody
  } as ReturnType
}
