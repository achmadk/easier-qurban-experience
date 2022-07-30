import { createContext } from "react"

import { IModelQurbanEventWithID } from "models"

export interface IContextPageAdminQurbanEventsBase<
  QurbanEventType extends IModelQurbanEventWithID = IModelQurbanEventWithID
> {
  mode: 'CREATE' | 'VIEW'
  toggleMode(mode?: 'CREATE' | 'VIEW'): void
  qurbanEventsData?: QurbanEventType[] | null
}

export const ContextPageQurbanEvents = createContext<IContextPageAdminQurbanEventsBase>(null)