import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";
import { IModelQurbanEventWithMosqueID } from "models";

export const CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_API_ROUTE_SERVER =
  'ControllerQurbanEventAdminAddHandleAPIRouteServer'

export function getControllerQurbanEventAdminAddHandleAPIRouteServer<
  BodyType extends IModelQurbanEventWithMosqueID = IModelQurbanEventWithMosqueID
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { data } = req.body as { data: string }
      const { qurbanEvent, mosqueId } = await transformRequestBody(data)
      const savedQurbanEvent = await prisma.qurbanEvents.create({
        data: qurbanEvent
      })
      await prisma.mosqueQurbanEvent.create({
        data: {
          mosqueId,
          qurbanEventId: savedQurbanEvent.id
        }
      })
      const response: BodyType = {
        mosqueId,
        ...savedQurbanEvent,
      } as unknown as BodyType
      res.status(200).json({ data: response })
    } catch {
      res.status(500).send('Error Add Qurban Event')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}