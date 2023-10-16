import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";
import { IModelQurbanRegistrationRequestBody } from "models";

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_UPDATE_HANDLE_API_ROUTE_SERVER =
  'ControllerQurbanRegistrationAdminUpdateHandleAPIRouteServer'

export function getControllerQurbanRegistrationAdminUpdateHandleAPIRouteServer<
  BodyType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody
>(): IControllerCoreHandleAPIRoute {

  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()

    const prisma = new PrismaClient()
    try {
      const { data } = req.body as { data: string }
      const { id, qurbanEventId, sacrificialAnimalId, participantIds } = await transformRequestBody(data)
      const savedQurbanRegistration = await prisma.qurbanRegistration.update({
        where: {
          id: id!,
        },
        data: {
          qurbanEventId,
          sacrificialAnimalId,
        }
      })
      if (participantIds && Array.isArray(participantIds)) {
        await prisma.qurbanRegistrationParticipant.deleteMany({
          where: {
            qurbanRegistrationId: id!,
          }
        })
        participantIds.map(async (participantId) => {
            return await prisma.qurbanRegistrationParticipant.create({
              data: {
                qurbanRegistrationId: id!,
                userId: participantId,
              }
            })
        })
      }
      res.status(200).json({ data: savedQurbanRegistration })
    } catch (error) {
      console.log(error)
      res.status(500).send('Error update Qurban Registration')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}
