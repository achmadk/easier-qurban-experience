import { decryptMessage } from 'services';

import { IControllerCoreTransformRequestBody } from "controllers/core";
import { DefaultMosqueFindTransformRequestBodyClient } from './client.hooks';

export function getControllerMosqueAdminFindTransformRequestBodyServer<
  OutputType extends DefaultMosqueFindTransformRequestBodyClient = DefaultMosqueFindTransformRequestBodyClient
>(): IControllerCoreTransformRequestBody<string, Promise<OutputType>> {
  const transformRequestBody = async (input: string): Promise<OutputType> => {
    try {
      return await decryptMessage<OutputType>(input) as OutputType
    } catch {
      return null as unknown as OutputType
    }
  }

  return {
    transformRequestBody
  }
}
