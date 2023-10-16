import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { getControllerCitizenAdminFindGetResourceData, getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";
import { ICitizenBase } from "models";

export const CONTROLLER_QURBAN_CITIZEN_ADMIN_CREATE_MANY_HANDLE_API_ROUTE_SERVER =
  'ControllerQurbanCitizenAdminCreateManyHandleAPIRouteServer'

export interface DefaultQurbanCitizenAdminCreateManyRequestBody {
  type: 'CREATE_MANY_FROM_FILE' | 'CREATE_MANY_FROM_MOSQUE_CITIZEN'
  mosqueId?: string | null
  qurbanEventId: string
  citizens?: ICitizenBase[] | null
}

export function getControllerQurbanCitizenAdminCreateManyHandleAPIRouteServer<
  BodyType extends DefaultQurbanCitizenAdminCreateManyRequestBody = DefaultQurbanCitizenAdminCreateManyRequestBody
>(): IControllerCoreHandleAPIRoute {
  const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()
  const { getData: getSavedCitizens }
    = getControllerCitizenAdminFindGetResourceData()

  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient()
    try {
      const { data } = req.body as { data: string }
      const { citizens, mosqueId, type, qurbanEventId } = await transformRequestBody(data)
      const citizenRole = await prisma.role.findFirst({
        where: {
          code: 'CITIZEN'
        }
      })
      let savedCitizens
      if (type === 'CREATE_MANY_FROM_FILE' && Array.isArray(citizens)) {
        savedCitizens = await prisma.$transaction(
          citizens.map((data) => prisma.user.create({ data }))
        )
        await prisma.userRole.createMany({
          data: savedCitizens.map((user) => ({
            userId: user.id,
            roleId: citizenRole?.id
          }))
        })
      } else {
        savedCitizens = await getSavedCitizens(mosqueId!)
      }
      await prisma.qurbanEventCitizen.createMany({
        data: savedCitizens.map((user) => ({
          userId: user.id,
          qurbanEventId,
        }))
      })
      res.status(200).json({ data: savedCitizens })
    } catch (error) {
      console.log(error)
      res.status(500).send('Error Create Many Qurban Citizens')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}
