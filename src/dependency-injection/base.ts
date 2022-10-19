import { container } from 'inversify-hooks-esm'

import {
  CONTROLLER_CORE_LABEL_ACTION_BASE_CLIENT,
  CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT,
  CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_INITIAL_VALUE_CLIENT,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_VALIDATOR_CLIENT,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_UPDATE_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT,
  useControllerCoreLabelActionBaseClient,
  useControllerMosqueAdminRegisterHandleSubmitClient,
  useControllerMosqueAdminRegisterTransformRequestBodyClient,
  useControllerQurbanEventAdminAddHandleSubmitClient,
  useControllerQurbanRegistrationAdminAddHandleSubmitClient,
  useControllerQurbanRegistrationAdminAddOrUpdateGetInitialValueClient,
  useControllerQurbanRegistrationAdminAddOrUpdateGetValidatorClient,
  useControllerQurbanRegistrationAdminAddOrUpdateHandleSubmitClient,
  useControllerQurbanRegistrationAdminUpdateHandleSubmitClient,
  useControllerUserAdminLogoutBaseClient
} from 'controllers'
import { getServiceCoreRemoteBase, SERVICE_CORE_REMOTE_BASE } from 'services'

export function bindDependencyInjectionMethods() {
  container
    .bind(SERVICE_CORE_REMOTE_BASE)
    .toDynamicValue(() => getServiceCoreRemoteBase())

  container
    .bind(CONTROLLER_CORE_LABEL_ACTION_BASE_CLIENT)
    .toDynamicValue(() => useControllerCoreLabelActionBaseClient())

  container
    .bind(CONTROLLER_MOSQUE_ADMIN_REGISTER_TRANSFORM_REQUEST_BODY_CLIENT)
    .toDynamicValue(() => useControllerMosqueAdminRegisterTransformRequestBodyClient())

  container
    .bind(CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT)
    .toDynamicValue(() => useControllerMosqueAdminRegisterHandleSubmitClient())

  container
    .bind(CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_SUBMIT_CLIENT)
    .toDynamicValue(() => useControllerQurbanEventAdminAddHandleSubmitClient())

  container
    .bind(CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT)
    .toDynamicValue(() => useControllerQurbanRegistrationAdminAddHandleSubmitClient())

  container
    .bind(CONTROLLER_QURBAN_REGISTRATION_ADMIN_UPDATE_HANDLE_SUBMIT_CLIENT)
    .toDynamicValue(() => useControllerQurbanRegistrationAdminUpdateHandleSubmitClient())

  container
    .bind(CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_INITIAL_VALUE_CLIENT)
    .toDynamicValue(() => useControllerQurbanRegistrationAdminAddOrUpdateGetInitialValueClient())

  container
    .bind(CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_VALIDATOR_CLIENT)
    .toDynamicValue(() => useControllerQurbanRegistrationAdminAddOrUpdateGetValidatorClient())

  container
    .bind(CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_HANDLE_SUBMIT_CLIENT)
    .toDynamicValue(() => useControllerQurbanRegistrationAdminAddOrUpdateHandleSubmitClient())

  container
    .bind(CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT)
    .toDynamicValue(() => useControllerUserAdminLogoutBaseClient())
  return container
}