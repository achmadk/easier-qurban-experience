import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { DefaultCitizenAdminCreateManyRequestBody, getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";

export const CONTROLLER_CITIZEN_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerCitizenAdminFindHandleAPIRouteServer'

export function getControllerCitizenAdminFindHandleAPIRouteServer<
  BodyType extends DefaultCitizenAdminCreateManyRequestBody = DefaultCitizenAdminCreateManyRequestBody
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { query } = req.query as { query: string }
      const { mosqueId } = await transformRequestBody(query)
      const mosqueUsers = await prisma.mosqueUser.findMany({
        where: {
          mosqueId
        },
        include: {
          user: true
        }
      })
      const userIds = mosqueUsers.map((data) => data.user)
        .map((item) => item.id)
      const userRoles = await prisma.userRole.findMany({
        where: {
          userId: {
            in: userIds
          }
        },include: {
          user: true,
          role: true
        } 
      })
      const citizenRole = await prisma.role.findFirst({
        where: {
          code: 'CITIZEN'
        }
      })
      const savedCitizens = userRoles
        .filter((item) =>
          item.role.id === citizenRole.id
        ).map((item) => ({
          ...item.user,
          role: item.role,
        }))
      res.status(200).json({ data: savedCitizens })
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