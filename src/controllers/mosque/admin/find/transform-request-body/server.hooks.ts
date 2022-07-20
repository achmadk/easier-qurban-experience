import { Worker } from 'worker_threads'
import { wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/esm/node-adapter.mjs'

import { IControllerCoreTransformRequestBody } from "controllers/core";
import { IUserBase } from "models";
import { JWTWorkerType } from 'services';

export function getControllerMosqueAdminFindTransformRequestBodyServer<
  UserType extends IUserBase = IUserBase
>(): IControllerCoreTransformRequestBody<string, Promise<UserType | null>> {
  const transformRequestBody = async (input: string): Promise<UserType | null> => {
    const worker = new Worker(
      new URL('../../../../../services/core/jwt/worker.server.ts', import.meta.url)
    )
    const api = wrap(nodeEndpoint(worker)) as unknown as JWTWorkerType
    try {
      const { user } = await api.decryptMessage<{ user: UserType }>(input)
      return user
    } catch {
      return null
    } finally {
      worker.terminate()
    }
  }
  
  return {
    transformRequestBody
  }
}