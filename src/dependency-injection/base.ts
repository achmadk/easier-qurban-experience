import { container } from 'inversify-hooks-esm'

import {
  CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT,
  CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT,
  useControllerMosqueAdminRegisterHandleSubmitClient,
  useControllerMosqueAdminRegisterTransformRequestBodyClient,
  useControllerUserAdminLogoutBaseClient
} from 'controllers'
import { getServiceCoreRemoteBase, SERVICE_CORE_REMOTE_BASE } from 'services'

export function bindDependencyInjectionMethods() {
  container
    .bind(SERVICE_CORE_REMOTE_BASE)
    .toDynamicValue(() => getServiceCoreRemoteBase())
  container
    .bind(CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT)
    .toDynamicValue(() => useControllerMosqueAdminRegisterTransformRequestBodyClient())

  container
    .bind(CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT)
    .toDynamicValue(() => useControllerMosqueAdminRegisterHandleSubmitClient())

  container
    .bind(CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT)
    .toDynamicValue(() => useControllerUserAdminLogoutBaseClient())
}