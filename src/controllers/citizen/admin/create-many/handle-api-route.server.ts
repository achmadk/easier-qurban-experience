import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { DefaultCitizenAdminCreateManyRequestBody, getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";

export const CONTROLLER_MOSQUE_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerMosqueAdminFindHandleAPIRouteServer'

export function getControllerCitizenAdminCreateManyHandleAPIRouteServer<
  BodyType extends DefaultCitizenAdminCreateManyRequestBody = DefaultCitizenAdminCreateManyRequestBody
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { data } = req.body as { data: string }
      const { citizens, mosqueId } = await transformRequestBody(data)
      const citizenRole = await prisma.role.findFirst({
        where: {
          code: 'CITIZEN'
        }
      })
      const savedCitizens = await prisma.$transaction(
        citizens.map((data) => prisma.user.create({ data }))
      )
      await Promise.all([
        prisma.userRole.createMany({
          data: savedCitizens.map((user) => ({
            userId: user.id,
            roleId: citizenRole.id
          }))
        }),
        prisma.mosqueUser.createMany({
          data: savedCitizens.map((user) => ({
            mosqueId,
            userId: user.id
          }))
        })
      ])
      res.status(200).json({ data: savedCitizens })
    } catch {
      res.status(500).send('Error Create Many Citizens')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}