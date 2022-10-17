import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from '@prisma/client';

import { getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerQurbanRegistrationAdminFindHandleAPIRouteServer'

export interface DefaultQurbanRegistrationAdminFindRequestBody {
  qurbanEventId: string
}

export function getControllerQurbanRegistrationAdminFindHandleAPIRouteServer<
  BodyType extends DefaultQurbanRegistrationAdminFindRequestBody = DefaultQurbanRegistrationAdminFindRequestBody
>(): IControllerCoreHandleAPIRoute {

  const prisma = new PrismaClient()

  const getParticipants = async (qurbanRegistrationId: string) => {
    const result = await prisma.qurbanRegistrationParticipant.findMany({
      where: {
        qurbanRegistrationId,
      },
      include: {
        user: true
      }
    })
    return result?.map((item) => item.user) ?? []
  }
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    try {
      const { query } = req.query as { query: string }
      const { qurbanEventId } = await transformRequestBody(query)
      const savedQurbanRegistration = await prisma.qurbanRegistration.findMany({
        where: {
          qurbanEventId
        },
        include: {
          sacrificialAnimal: true,
        }
      })
      const data: (typeof savedQurbanRegistration[number] & { participants: User[] })[] = []
      for (let index = 0; index < savedQurbanRegistration.length; index++) {
        const item = savedQurbanRegistration[index];
        const participants = await getParticipants(item.id)
        data.push({ ...item, participants })
      }
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