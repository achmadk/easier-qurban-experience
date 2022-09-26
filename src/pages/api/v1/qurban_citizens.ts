import { NextApiRequest, NextApiResponse } from "next";

import {
  getControllerQurbanCitizenAdminCreateManyHandleAPIRouteServer,
  getControllerQurbanCitizenAdminFindHandleAPIRouteServer
} from "controllers";

async function qurbanCitizenAPIHandler (req: NextApiRequest, res: NextApiResponse) {
  const citizenCreateManyCtrl = getControllerQurbanCitizenAdminCreateManyHandleAPIRouteServer()
  const citizenFindCtrl = getControllerQurbanCitizenAdminFindHandleAPIRouteServer()
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

export default qurbanCitizenAPIHandler