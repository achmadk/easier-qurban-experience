import { decryptMessage } from 'services';

import { IControllerCoreTransformRequestBody } from "controllers/core";
import { IUserBase } from "models";

export function getControllerMosqueAdminFindTransformRequestBodyServer<
  UserType extends IUserBase = IUserBase
>(): IControllerCoreTransformRequestBody<string, Promise<UserType | null>> {
  const transformRequestBody = async (input: string): Promise<UserType | null> => {
    try {
      const { user } = await decryptMessage<{ user: UserType }>(input)
      return user
    } catch {
      return null
    }
  }
  
  return {
    transformRequestBody
  }
}