import { NextApiRequest, NextApiResponse } from "next";

import {
  getControllerCitizenAdminCreateManyHandleAPIRouteServer,
  getControllerCitizenAdminFindHandleAPIRouteServer
} from "controllers";

async function citizenAPIHandler (req: NextApiRequest, res: NextApiResponse) {
  const citizenCreateManyCtrl = getControllerCitizenAdminCreateManyHandleAPIRouteServer()
  const citizenFindCtrl = getControllerCitizenAdminFindHandleAPIRouteServer()
  const { method } = req

  switch (method) {
    case 'POST':
      return await citizenCreateManyCtrl.handleAPIRoute(req, res)

    case 'GET':
      return await citizenFindCtrl.handleAPIRoute(req, res)

    case 'OPTIONS':
      return res.status(200).send('OK')
        
    default:
      return res.status(404).send('Method not found')
  }
}

export default citizenAPIHandler