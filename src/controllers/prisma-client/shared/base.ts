import { Prisma, PrismaClient } from '@prisma/client'

export type IControllerPrismaClientSharedBase<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  RejectOnNotFound extends Prisma.RejectOnNotFound = Prisma.RejectOnNotFound,
  RejectPerOperation extends Prisma.RejectPerOperation = Prisma.RejectPerOperation
> = PrismaClient<ClientOptions, never, RejectOnNotFound | RejectPerOperation>

export const CONTROLLER_PRISMA_CLIENT_SHARED_BASE = 'ControllerPrismaClientSharedBase'

export const controllerPrismaClientSharedBase = new PrismaClient()
