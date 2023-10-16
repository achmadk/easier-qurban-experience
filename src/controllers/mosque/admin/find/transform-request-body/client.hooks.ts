import { useUser } from "@clerk/nextjs";
import { wrap } from "comlink";

import { IControllerCoreTransformRequestBody } from "controllers/core";
import { IUserBase } from "models";
import { JWTWorkerType } from "services";

export const CONTROLLER_MOSQUE_FIND_TRANSFORM_REQUEST_BODY_CLIENT =
  'ControllerMosqueFindTransformRequestBodyClient'


export interface DefaultMosqueAdminFindTransformRequestBodyClientOptions {
  mosqueId?: string | null
}

export interface DefaultMosqueFindTransformRequestBodyClient<
  UserType extends IUserBase = IUserBase
> extends DefaultMosqueAdminFindTransformRequestBodyClientOptions {
  user: UserType
  timestamp: number
}
export function useControllerMosqueFindTransformRequestBodyClient<
  OptionsType extends DefaultMosqueAdminFindTransformRequestBodyClientOptions = DefaultMosqueAdminFindTransformRequestBodyClientOptions,
  InputType extends IUserBase = IUserBase,
  TransformedInputType extends DefaultMosqueFindTransformRequestBodyClient<InputType> = DefaultMosqueFindTransformRequestBodyClient<InputType>
>(): IControllerCoreTransformRequestBody<OptionsType | null | undefined, Promise<string>> {
  const { user: clerkUser } = useUser()

  const transformRequestBody = async (options?: OptionsType) => {
    const mosqueId = options?.mosqueId ?? null
    const worker = new Worker(
      new URL('../../../../../services/core/jwt/worker.client.ts', import.meta.url),
      { name: 'jwt-worker-client' }
    )
    const api = wrap(worker) as unknown as JWTWorkerType
    try {
      const input: TransformedInputType = {
        user: {
            name: clerkUser?.fullName,
            email: clerkUser?.primaryEmailAddress?.emailAddress ?? '',
        },
        ...(mosqueId ? { mosqueId } : {}),
        timestamp: Date.now()
      } as TransformedInputType
      return await api.encryptMessage(input) as string
    } finally {
      worker.terminate()
    }
  }

  return {
    transformRequestBody,
  }
}
