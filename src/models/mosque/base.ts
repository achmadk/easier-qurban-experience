import { IUserBase } from "models"

export interface IMosqueBase {
  name: string
  address?: string
}

export type IMosqueWithUser<
  MosqueType extends IMosqueBase = IMosqueBase,
  UserType extends IUserBase = IUserBase
> = MosqueType & {
  user: UserType
}

export interface IMosqueWithID extends IMosqueBase {
  id: string
}