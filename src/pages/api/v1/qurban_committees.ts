import type { NextApiRequest, NextApiResponse } from 'next'

import { getControllerQurbanCommitteeAdminGetHandleRouteAPIServer } from 'controllers'

async function qurbanCommitteeAPIHandler (req: NextApiRequest, res: NextApiResponse) {
  const qurbanCommitteeGetCtrl = getControllerQurbanCommitteeAdminGetHandleRouteAPIServer()
  const { method } = req

  switch (method) {
    case 'GET':
      return await qurbanCommitteeGetCtrl.handleAPIRoute(req, res)

    case 'OPTIONS':
      return res.status(200).send('OK')
        
    default:
      return res.status(404).send('Method not found')
  }
}

export default qurbanCommitteeAPIHandler