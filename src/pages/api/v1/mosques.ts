import type { NextApiRequest, NextApiResponse } from 'next'
// import { container } from 'inversify-props-esm'

import {
  getControllerMosqueAdminRegisterHandleAPIRouteServer,
  // CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_API_ROUTE_SERVER,
  // IControllerCoreHandleAPIRoute
} from 'controllers'
import { getControllerMosqueAdminFindHandleAPIRouteServer } from 'controllers/mosque/admin/find/handle-api-route.server'

async function mosqueAPIHandler (req: NextApiRequest, res: NextApiResponse) {
  // const mosqueRegistrationCtrl = container.get<IControllerCoreHandleAPIRoute>(CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_API_ROUTE_SERVER)
  const mosqueRegistrationCtrl = getControllerMosqueAdminRegisterHandleAPIRouteServer()
  const mosqueFindCtrl = getControllerMosqueAdminFindHandleAPIRouteServer()
  const { method } = req

  switch (method) {
    case 'POST':
      return await mosqueRegistrationCtrl.handleAPIRoute(req, res)

    case 'GET':
      return await mosqueFindCtrl.handleAPIRoute(req, res)

    case 'OPTIONS':
      return res.status(200).send('OK')
        
    default:
      return res.status(404).send('Method not found')
  }
}

export default mosqueAPIHandler