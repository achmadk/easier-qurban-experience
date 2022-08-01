import { PrismaClient } from "@prisma/client"

import { IControllerCoreGetResourceDataOnlyFunction } from "controllers/core"

import { IUserWithID } from "models"

export function getControllerCitizenAdminFindGetResourceData<
  OutputType extends IUserWithID = IUserWithID
>(): IControllerCoreGetResourceDataOnlyFunction<string, Promise<OutputType[]>> {
  const getData = async (mosqueId: string) => {
    const prisma = new PrismaClient()
    try {
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
        })) as unknown as OutputType[]
      return savedCitizens
    } catch (error) {
      console.log(error)
      return []
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    getData,
  }
}