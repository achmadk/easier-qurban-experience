import { IModelCoreOnlyID } from "models/core"

export interface IModelUserRoleBase {
  name: string
  code: string
  description: string
}

export interface IModelUserRoleWithID
  extends IModelUserRoleBase, IModelCoreOnlyID {}