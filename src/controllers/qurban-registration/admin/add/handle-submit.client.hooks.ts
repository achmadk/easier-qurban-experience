import { useContainerGet } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { FormikHelpers } from 'formik';

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { IControllerCoreHandleSubmit, useControllerCoreEncryptionTransformRequestBodyBaseClient } from "controllers/core";
import { IModelQurbanRegistrationRequestBody } from 'models';

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
  = 'ControllerQurbanEventRegistrationAdminAddHandleSubmitClient'

export function useControllerQurbanRegistrationAdminAddHandleSubmitClient<
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody
>(): IControllerCoreHandleSubmit<InputType> {
  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const { transformRequestBody } =
    useControllerCoreEncryptionTransformRequestBodyBaseClient<InputType>()

  const handleSubmit = async (input: InputType, { setSubmitting }: FormikHelpers<InputType>) => {
    setSubmitting(true)
    try {
      const data = await transformRequestBody(input)
      await toast.promise(
        remoteService.post('/qurban_registrations', { data }),
        {
          pending: 'Loading add qurban registration...',
          success: `Successfully add qurban registration.`,
          error: `Error add qurban registration`
        }
      )
    } finally {
      setSubmitting(false)
    }
  }

  return {
    handleSubmit,
  }
}