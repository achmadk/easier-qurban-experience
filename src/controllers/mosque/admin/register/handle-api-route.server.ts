import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { IControllerCoreHandleAPIRoute } from "controllers";
import { IMosqueWithUser } from "models";

export const CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_API_ROUTE_SERVER =
  'ControllerMosqueAdminRegisterHandleAPIRoutePostServer'

export function getControllerMosqueAdminRegisterHandleAPIRouteServer<
  BodyType extends IMosqueWithUser = IMosqueWithUser
>(): IControllerCoreHandleAPIRoute {
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const prismaClient = new PrismaClient()
    try {
      const castedBody = req.body as BodyType
      const { user, ...mosqueData } = castedBody
      const newMosqueData = await prismaClient.mosque.create({
        data: mosqueData
      })
      const newUserData = await prismaClient.user.create({
        data: user
      })
      await prismaClient.mosqueUser.create({
        data: {
          mosqueId: newMosqueData.id,
          userId: newUserData.id
        }
      })
      const adminRole = await prismaClient.role.findFirst({
        where: {
          code: 'HEAD_OF_ADMINISTRATOR'
        }
      })
      await prismaClient.userRole.create({
        data: {
          userId: newUserData.id,
          roleId: adminRole.id
        }
      })
      res.status(200).json({ data: newMosqueData })
    } catch {
      res.status(500).send('Error Register Mosque')
    } finally {
      prismaClient.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}