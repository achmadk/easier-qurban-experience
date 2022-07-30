import { IModelCoreOnlyID } from "models/core";
import { IUserBase } from "../base";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICitizenBase
  extends Omit<IUserBase, 'image'> {}

export interface ICitizenWithID
  extends ICitizenBase, IModelCoreOnlyID {}
