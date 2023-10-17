import { Prisma, PrismaClient } from '@prisma/client'

export type IControllerPrismaClientSharedBase<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
> = PrismaClient<ClientOptions>

export const CONTROLLER_PRISMA_CLIENT_SHARED_BASE = 'ControllerPrismaClientSharedBase'

export const controllerPrismaClientSharedBase = new PrismaClient()
