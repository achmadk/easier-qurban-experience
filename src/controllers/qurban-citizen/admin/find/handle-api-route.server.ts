import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";

export const CONTROLLER_QURBAN_CITIZEN_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerQurbanCitizenAdminFindHandleAPIRouteServer'

export interface DefaultQurbanCitizenAdminFindRequestBody {
  qurbanEventId: string
}

export function getControllerQurbanCitizenAdminFindHandleAPIRouteServer<
  BodyType extends DefaultQurbanCitizenAdminFindRequestBody = DefaultQurbanCitizenAdminFindRequestBody
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { query } = req.query as { query: string }
      const { qurbanEventId } = await transformRequestBody(query)
      const savedQurbanEventCitizen = await prisma.qurbanEventCitizen.findMany({
        where: {
          qurbanEventId
        },
        include: {
          user: true
        }
      })
      console.log(savedQurbanEventCitizen)
      const data = savedQurbanEventCitizen?.map((data) => data.user) ?? []
      res.status(200).json({ data })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}