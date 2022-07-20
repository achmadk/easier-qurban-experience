import { container } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios'

import { CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT, IControllerCoreHandleSubmit, IControllerMosqueAdminRegisterTransformRequestBodyClient } from "controllers";
import { IMosqueBase } from "models";
import { SERVICE_CORE_REMOTE_BASE } from 'services';

export const CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT = 'ControllerMosqueAdminRegisterHandleSubmitClient'

export function useControllerMosqueAdminRegisterHandleSubmitClient<
  InputType extends IMosqueBase = IMosqueBase
>(): IControllerCoreHandleSubmit<InputType> {
  const mosqueRegistrationCtrl = container.get<IControllerMosqueAdminRegisterTransformRequestBodyClient<InputType>>(CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT)
  const remoteService = container.get<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)

  const handleSubmit = async (initialInput: InputType) => {
    const input = mosqueRegistrationCtrl.transformRequestBody(initialInput)
    const response = await remoteService.post('/mosques', input)
    console.log(input, response)
  }
  return {
    handleSubmit,
  }
}