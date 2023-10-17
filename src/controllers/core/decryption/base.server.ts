import { decryptMessage } from 'services';

import { IControllerCoreTransformRequestBody } from "controllers/core";

export function getControllerCoreDecryptionTransformRequestBodyServer<
  OutputType = unknown
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
