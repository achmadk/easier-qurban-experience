import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

import { IControllerCoreHandleAPIRoute } from "controllers";

export const CONTROLLER_SACRIFICIAL_ANIMAL_SHARED_GET_HANDLE_API_ROUTE_SERVER =
  'ControllerSacrificialAnimalSharedGetHandleAPIRouteServer'

export function getControllerSacrificialAnimalSharedGetHandleAPIRouteServer(): IControllerCoreHandleAPIRoute {
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    try {
      const data = await prisma.sacrificialAnimals.findMany()
      res.status(200).json({ data })
    } catch {
      res.status(500).send('Error Find Sacrificial Animals')
    } finally {
      prisma.$disconnect()
    }
  }

  return {
    handleAPIRoute
  }
}