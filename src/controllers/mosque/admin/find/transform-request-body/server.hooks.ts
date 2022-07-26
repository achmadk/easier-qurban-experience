import { decryptMessage } from 'services';

import { IControllerCoreTransformRequestBody } from "controllers/core";
import { DefaultMosqueFindTransformRequestBodyClient } from './client.hooks';

export function getControllerMosqueAdminFindTransformRequestBodyServer<
  OutputType extends DefaultMosqueFindTransformRequestBodyClient = DefaultMosqueFindTransformRequestBodyClient
>(): IControllerCoreTransformRequestBody<string, Promise<OutputType | null>> {
  const transformRequestBody = async (input: string): Promise<OutputType | null> => {
    try {
      return await decryptMessage<OutputType>(input)
    } catch {
      return null
    }
  }
  
  return {
    transformRequestBody
  }
}