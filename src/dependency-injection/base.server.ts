import { container } from 'inversify-props-esm'

import { CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_API_ROUTE_SERVER, getControllerMosqueAdminRegisterHandleAPIRouteServer } from 'controllers'

export function bindDependencyInjectionServer () {
  // Server side
  container
    .bind(CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_API_ROUTE_SERVER)
    .toDynamicValue(() => getControllerMosqueAdminRegisterHandleAPIRouteServer())
}