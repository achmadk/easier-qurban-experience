import { useContainerGet } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { useControllerQurbanRegistrationAdminAddTransformRequestBodyClient } from "./transform-request-body.client.hooks";

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { IControllerCoreHandleSubmit } from "controllers/core";
import { IModelQurbanRegistrationRequestBody } from 'models';

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
  = 'ControllerQurbanEventRegistrationAdminAddHandleSubmitClient'

export function useControllerQurbanRegistrationAdminAddHandleSubmitClient<
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody
>(): IControllerCoreHandleSubmit<InputType> {
  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const { transformRequestBody } = useControllerQurbanRegistrationAdminAddTransformRequestBodyClient<InputType>()
  const handleSubmit = async (input: InputType) => {
    const data = await transformRequestBody(input)
    await toast.promise(
      remoteService.post('/qurban_registrations', { data }),
      {
        pending: 'Loading add qurban explanation...',
        success: `Successfully register add qurban participant.`,
        error: `Error adding qurban registration`
      }
    )
  }
  return {
    handleSubmit,
  }
}