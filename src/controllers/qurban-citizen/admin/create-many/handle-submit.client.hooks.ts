import { useContainerGet } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { useControllerQurbanCitizenAdminCreateManyTransformRequestBodyClient } from "./transform-request-body.client.hooks";

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { IControllerCoreHandleSubmit } from "controllers/core";
import { ICitizenBase } from "models/user/citizen";

export function useControllerQurbanCitizenAdminCreateManyHandleSubmitClient<
  InputType extends ICitizenBase = ICitizenBase
>(): IControllerCoreHandleSubmit<InputType[]> {
  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const { transformRequestBody } = useControllerQurbanCitizenAdminCreateManyTransformRequestBodyClient<InputType>()
  const handleSubmit = async (input: InputType[]) => {
    const data = await transformRequestBody(input)
    await toast.promise(
      remoteService.post('/qurban_citizens', { data }),
      {
        pending: 'Loading add qurban citizens...',
        success: `Successfully add ${input.length} citizens.`,
        error: `Error adding qurban citizens`
      }
    )
  }
  return {
    handleSubmit,
  }
}