import type { NextApiRequest, NextApiResponse } from 'next'

import { getControllerSacrificialAnimalSharedGetHandleAPIRouteServer } from 'controllers'

async function sacrificialAnimalsAPIHandler (req: NextApiRequest, res: NextApiResponse) {
  const sacrificialAnimalGetCtrl = getControllerSacrificialAnimalSharedGetHandleAPIRouteServer()
  const { method } = req

  switch (method) {
    case 'GET':
      return await sacrificialAnimalGetCtrl.handleAPIRoute(req, res)

    case 'OPTIONS':
      return res.status(200).send('OK')
        
    default:
      return res.status(404).send('Method not found')
  }
}

export default sacrificialAnimalsAPIHandler