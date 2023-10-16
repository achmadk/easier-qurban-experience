import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { DefaultMosqueFindTransformRequestBodyClient, IControllerCoreHandleAPIRoute } from "controllers";
import { getControllerMosqueAdminFindTransformRequestBodyServer } from './transform-request-body/server.hooks';

export const CONTROLLER_MOSQUE_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerMosqueAdminFindHandleAPIRouteServer'

export function getControllerMosqueAdminFindHandleAPIRouteServer<
  BodyType extends DefaultMosqueFindTransformRequestBodyClient = DefaultMosqueFindTransformRequestBodyClient
>(): IControllerCoreHandleAPIRoute {

  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerMosqueAdminFindTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { query } = req.query as { query: string }
      const { user, mosqueId } = await transformRequestBody(query)
      const savedUserData = await prisma.user.findFirst({ where: user })

      if (!savedUserData?.id) {
        return res.status(200).json({ data: [] })
      }
      const savedMosqueUserData = await prisma.mosqueUser.findMany({
        where: { userId: savedUserData.id },
        include: { mosque: true }
      })
      let data = savedMosqueUserData.map((item) => item.mosque)
      if (mosqueId) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data = [data?.find((item) => item.id === mosqueId)] ?? []
      }
      res.status(200).json({ data })
    } catch {
      res.status(500).send('Error Find Mosque from specified query')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}
