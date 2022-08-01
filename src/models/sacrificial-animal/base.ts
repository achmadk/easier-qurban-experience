import { IModelCoreOnlyID } from "models/core"

export interface IModelSacrificialAnimalBase {
  name: string
  code: string
  /** minimal age with month unit */
  minimalAge: number
  maximalUser: number
}

export interface IModelSacrificialAnimalWithId
  extends IModelSacrificialAnimalBase, IModelCoreOnlyID {}