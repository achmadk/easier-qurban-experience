import { container } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { useControllerCitizenAdminCreateManyTransformRequestBodyClient } from "./transform-request-body.client.hooks";

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { IControllerCoreHandleSubmit } from "controllers/core";
import { ICitizenBase } from "models/user/citizen";

export function useControllerCitizenAdminCreateManyHandleSubmitClient<
  InputType extends ICitizenBase = ICitizenBase
>(): IControllerCoreHandleSubmit<InputType[]> {
  const remoteService = container.get<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const { transformRequestBody } = useControllerCitizenAdminCreateManyTransformRequestBodyClient<InputType>()
  const handleSubmit = async (input: InputType[]) => {
    const data = await transformRequestBody(input)
    await toast.promise(
      remoteService.post('/citizens', { data }),
      {
        pending: 'Loading add citizens...',
        success: `Successfully add ${input.length} citizens.`,
        error: `Error adding citizens`
      }
    )
  }
  return {
    handleSubmit,
  }
}