import type { NextApiRequest, NextApiResponse } from 'next'

import {
  getControllerQurbanEventAdminAddHandleAPIRouteServer,
  getControllerQurbanEventAdminFindHandleAPIRouteServer,
} from 'controllers'

async function qurbanEventAPIHandler (req: NextApiRequest, res: NextApiResponse) {
  const qurbanEventFindCtrl = getControllerQurbanEventAdminFindHandleAPIRouteServer()
  const qurbanEventAddCtrl = getControllerQurbanEventAdminAddHandleAPIRouteServer()
  const { method } = req

  switch (method) {
    case 'POST':
      return await qurbanEventAddCtrl.handleAPIRoute(req, res)

    case 'GET':
      return await qurbanEventFindCtrl.handleAPIRoute(req, res)

    case 'OPTIONS':
      return res.status(200).send('OK')
        
    default:
      return res.status(404).send('Method not found')
  }
}

export default qurbanEventAPIHandler