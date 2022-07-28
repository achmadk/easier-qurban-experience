import { decryptMessage } from 'services';

import { IControllerCoreTransformRequestBody } from "controllers/core";

export function getControllerCoreDecryptionTransformRequestBodyServer<
  OutputType = unknown
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