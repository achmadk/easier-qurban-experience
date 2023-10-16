import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";
import { IModelQurbanRegistrationRequestBody } from "models";

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_API_ROUTE_SERVER =
  'ControllerQurbanRegistrationAdminAddHandleAPIRouteServer'

export function getControllerQurbanRegistrationAdminAddHandleAPIRouteServer<
  BodyType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { data } = req.body as { data: string }
      const { qurbanEventId, sacrificialAnimalId, participantIds } = await transformRequestBody(data)
      const savedQurbanRegistration = await prisma.qurbanRegistration.create({
        data: {
          qurbanEventId,
          sacrificialAnimalId,
        }
      })
      await prisma.qurbanRegistrationStatus.create({
        data: {
            qurbanRegistrationId: savedQurbanRegistration.id,
        }
      })
      if (participantIds && Array.isArray(participantIds)) {
        participantIds.map(async (participantId) => {
            return await prisma.qurbanRegistrationParticipant.create({
              data: {
                qurbanRegistrationId: savedQurbanRegistration.id,
                userId: participantId,
              }
            })
        })
      }
      res.status(200).json({ data: savedQurbanRegistration })
    } catch {
      res.status(500).send('Error Add Qurban Registration')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}