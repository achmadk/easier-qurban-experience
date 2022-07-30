import { FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { container } from 'inversify-hooks-esm';
import { AxiosInstance } from "axios";

import { getMosqueID } from "state-management";

import { SERVICE_CORE_REMOTE_BASE } from "services";

import { IControllerCoreHandleSubmit, useControllerCoreEncryptionTransformRequestBodyBaseClient } from "controllers/core";
import { IModelQurbanEventBase, IModelQurbanEventWithID, IModelQurbanEventWithMosqueID } from "models";

export const CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
  = 'ControllerQurbanEventAdminAddHandleSubmitClient'

export function useControllerQurbanEventAdminAddHandleSubmitClient<
  InputType extends IModelQurbanEventBase = IModelQurbanEventBase,
  TransformedInputType extends IModelQurbanEventWithMosqueID<InputType> = IModelQurbanEventWithMosqueID<InputType>,
  OutputType extends IModelQurbanEventWithID = IModelQurbanEventWithID
>(): IControllerCoreHandleSubmit<InputType, OutputType | null> {
  const mosqueId = useSelector(getMosqueID)
  const { transformRequestBody: encryptRequestBody }
    = useControllerCoreEncryptionTransformRequestBodyBaseClient<TransformedInputType>()

  const remoteService = container.get<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)
  
  const handleSubmit = async (input: InputType, { setSubmitting }: FormikHelpers<InputType>) => {
    setSubmitting(true)
    try {
      const unencryptPayload = {
        mosqueId,
        qurbanEvent: input,
      } as TransformedInputType
      const data = await encryptRequestBody(unencryptPayload)
      const response = await toast.promise(
        remoteService.post<{ data: OutputType }>('/qurban_events', { data }),
        {
          pending: 'Submitting new qurban event...',
          success: 'Successfully create a new qurban event. redirecting...',
          error: 'Error create a new qurban event'
        }
      )
      return response.data?.data ?? null
    } catch {
      return null
    } finally {
      setSubmitting(false)
    }
  }
  return {
    handleSubmit,
  }
}