import { IModelCoreOnlyID } from "models/core"

export interface IModelQurbanEventBase {
  yearExecution: number
  dateExecution?: string
  description?: string
}

export interface IModelQurbanEventWithID
  extends IModelQurbanEventBase, IModelCoreOnlyID {
  mosqueId: string
}

export interface IModelQurbanEventWithMosqueID<
  QurbanEventType extends IModelQurbanEventBase = IModelQurbanEventBase
> {
  mosqueId: string
  qurbanEvent: QurbanEventType
}