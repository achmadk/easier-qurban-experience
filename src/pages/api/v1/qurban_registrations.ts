import type { NextApiRequest, NextApiResponse } from 'next'

import {
  getControllerQurbanRegistrationAdminAddHandleAPIRouteServer,
  getControllerQurbanRegistrationAdminFindHandleAPIRouteServer,
  getControllerQurbanRegistrationAdminUpdateHandleAPIRouteServer,
} from 'controllers'

async function qurbanRegistrationAPIHandler (req: NextApiRequest, res: NextApiResponse) {
  const qurbanRegistrationFindCtrl = getControllerQurbanRegistrationAdminFindHandleAPIRouteServer()
  const qurbanRegistrationAddCtrl = getControllerQurbanRegistrationAdminAddHandleAPIRouteServer()
  const qurbanRegistrationUpdateCtrl = getControllerQurbanRegistrationAdminUpdateHandleAPIRouteServer()
  const { method } = req

  switch (method) {
    case 'POST':
      return await qurbanRegistrationAddCtrl.handleAPIRoute(req, res)

    case 'PUT':
      return await qurbanRegistrationUpdateCtrl.handleAPIRoute(req, res)

    case 'GET':
      return await qurbanRegistrationFindCtrl.handleAPIRoute(req, res)

    case 'OPTIONS':
      return res.status(200).send('OK')
        
    default:
      return res.status(404).send('Method not found')
  }
}

export default qurbanRegistrationAPIHandler