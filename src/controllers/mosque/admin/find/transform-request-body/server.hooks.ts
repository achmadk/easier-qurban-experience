import { Worker } from 'node:worker_threads'
import { wrap } from 'comlink'
import nodeEndpoint from 'comlink/dist/esm/node-adapter.mjs'

import { JWTWorkerType } from 'services';

import { IControllerCoreTransformRequestBody } from "controllers/core";
import { IUserBase } from "models";

export function getControllerMosqueAdminFindTransformRequestBodyServer<
  UserType extends IUserBase = IUserBase
>(): IControllerCoreTransformRequestBody<string, Promise<UserType | null>> {
  const transformRequestBody = async (input: string): Promise<UserType | null> => {
    const worker = new Worker('../../../../../services/core/jwt/worker.server.mjs')
    const api = wrap(nodeEndpoint(worker)) as unknown as JWTWorkerType
    try {
      const { user } = await api.decryptMessage<{ user: UserType }>(input)
      return user
    } catch {
      return null
    }
  }
  
  return {
    transformRequestBody
  }
}