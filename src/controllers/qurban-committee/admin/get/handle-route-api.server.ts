import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

import { getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers/core";
import { IModelUserRoleWithID } from 'models';

export interface DefaultQurbanCommitteeAdminGetHandleRouteAPIServerRequestBody {
  mosqueId: string
}

export function getControllerQurbanCommitteeAdminGetHandleRouteAPIServer<
  ResponseType extends IModelUserRoleWithID = IModelUserRoleWithID,
  BodyType extends DefaultQurbanCommitteeAdminGetHandleRouteAPIServerRequestBody = DefaultQurbanCommitteeAdminGetHandleRouteAPIServerRequestBody
>(): IControllerCoreHandleAPIRoute<ResponseType[]> {
  const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient()
    try {
      const { query } = req.query as { query: string }
      const { mosqueId } = await transformRequestBody(query)
      const savedCommitteeRoles = await prisma.role.findMany({
        where: {
          code: {
            not: 'CITIZEN'
          }
        }
      })
      const savedCommitteeRoleIds = savedCommitteeRoles?.map(({ id }) => id)
      const savedMosqueUserData = await prisma.mosqueUser.findMany({
        where: {
          mosqueId
        },
        include: {
          user: true
        }
      })
      const savedUserIds = savedMosqueUserData
        ?.map((data) => data.user.id) ?? []
      const savedUserRole = await prisma.userRole.findMany({
        where: {
          AND: [{
            userId: {
              in: savedUserIds
            }
          }, {
            roleId: {
              in: savedCommitteeRoleIds
            }
          }]
        },
        include: {
          user: true,
          role: true
        }
      })
      const data = savedUserRole?.map((data) => ({
        ...data.user,
        role: data.role,
      })) ?? []
      res.status(200).json({ data })
    } catch {
      res.status(500).send('Error Find Qurban Committees')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute,
  }
}