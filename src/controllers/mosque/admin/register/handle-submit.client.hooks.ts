import { useContainerGet } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios'
import { FormikHelpers } from 'formik'
import { toast } from 'react-toastify';

import { CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT, IControllerCoreHandleSubmit, IControllerMosqueAdminRegisterTransformRequestBodyClient } from "controllers";
import { IMosqueBase, IMosqueWithID } from "models";
import { SERVICE_CORE_REMOTE_BASE } from 'services';

export const CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT = 'ControllerMosqueAdminRegisterHandleSubmitClient'

export function useControllerMosqueAdminRegisterHandleSubmitClient<
  InputType extends IMosqueBase = IMosqueBase,
  OutputType extends IMosqueWithID = IMosqueWithID
>(): IControllerCoreHandleSubmit<InputType, OutputType | null> {
  const mosqueRegistrationCtrl = useContainerGet<IControllerMosqueAdminRegisterTransformRequestBodyClient<InputType>>(CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT)
  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const handleSubmit = async (initialInput: InputType, { setSubmitting }: FormikHelpers<InputType>) => {
    setSubmitting(true)
    try {
      const input = mosqueRegistrationCtrl.transformRequestBody(initialInput)
      const response = await remoteService.post<{ data: OutputType }>('/mosques', input)
      toast.success('Mosque registration is succeed, redirecting...')
      return response.data?.data ?? null
    } finally {
      setSubmitting(false)
    }
  }
  return {
    handleSubmit,
  }
}