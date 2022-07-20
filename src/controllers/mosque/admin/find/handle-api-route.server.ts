import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { IControllerCoreHandleAPIRoute } from "controllers";
import { IUserBase } from "models";
import { getControllerMosqueAdminFindTransformRequestBodyServer } from './transform-request-body/server.hooks';

export const CONTROLLER_MOSQUE_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerMosqueAdminFindHandleAPIRouteServer'

export function getControllerMosqueAdminFindHandleAPIRouteServer<
  BodyType extends IUserBase = IUserBase
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerMosqueAdminFindTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { query } = req.query as { query: string }
      const user = await transformRequestBody(query)
      const savedUserData = await prisma.user.findFirst({ where: user })
      const savedMosqueUserData = await prisma.mosqueUser.findMany({
        where: { userId: savedUserData.id },
        include: { mosque: true }
      })
      const data = savedMosqueUserData.map((item) => item.mosque)
      res.status(200).json({ data })
    } catch (error) {
      console.log(error)
      res.status(500).send('Error Find Mosque from specified query')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}