import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";

export const CONTROLLER_QURBAN_EVENT_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerQurbanEventAdminFindHandleAPIRouteServer'

export interface DefaultQurbanEventAdminFindRequestBody {
  mosqueId: string
  qurbanEventId?: string | null
}

export function getControllerQurbanEventAdminFindHandleAPIRouteServer<
  BodyType extends DefaultQurbanEventAdminFindRequestBody = DefaultQurbanEventAdminFindRequestBody
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { query } = req.query as { query: string }
      const { mosqueId, qurbanEventId = null } = await transformRequestBody(query)
      const mosqueQurbanEvent = await prisma.mosqueQurbanEvent.findMany({
        where: {
          mosqueId,
          ...(qurbanEventId ? { qurbanEventId } : {}),
        },
        include: {
          qurbanEvent: true
        }
      })
      const qurbanEvents = mosqueQurbanEvent.map((data) => ({
        ...data.qurbanEvent,
        mosqueId: data.mosqueId,
    }))
      res.status(200).json({ data: qurbanEvents })
    } catch {
      res.status(500).send('Error Find Citizens')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}