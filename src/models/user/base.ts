import { IModelCoreOnlyID } from "models/core"
import { IModelUserRoleWithID } from "./role"

export interface IUserBase {
  name: string
  email?: string
  phoneNumber?: string
  image?: string
}

export interface IUserWithID<
  RoleType extends IModelUserRoleWithID = IModelUserRoleWithID
> extends IUserBase, IModelCoreOnlyID {
  role: RoleType
}