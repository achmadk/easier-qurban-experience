import { wrap } from "comlink";

import { IControllerCoreTransformRequestBody } from "controllers/core";
import { JWTWorkerType } from "services";

export function useControllerCoreEncryptionTransformRequestBodyBaseClient<
  InputType = unknown
>(): IControllerCoreTransformRequestBody<InputType, Promise<string>> {
  const transformRequestBody = async (initialInput: InputType) => {
    const worker = new Worker(
      new URL('services/core/jwt/worker.client.ts', import.meta.url),
      { name: 'jwt-worker-client' }
    )
    const api = wrap(worker) as unknown as JWTWorkerType
    try {
      const input = {
        ...initialInput,
        timestamp: Date.now()
      }
      return await api.encryptMessage(input)
    } finally {
      worker.terminate()
    }
  }

  return {
    transformRequestBody,
  }
}