import { createContext } from "react"

import { IModelQurbanRegistrationWithID, IModelSacrificialAnimalWithId, IUserWithID } from "models"

export interface IContextPageAdminQurbanRegistrationsBase<
  QurbanRegistrationType extends IModelQurbanRegistrationWithID = IModelQurbanRegistrationWithID,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId,
  QurbanCitizenType extends IUserWithID = IUserWithID,
> {
  mode: 'CREATE' | 'VIEW'
  toggleMode(mode?: 'CREATE' | 'VIEW'): void
  qurbanRegistrationsData?: QurbanRegistrationType[] | null
  qurbanEventsData?: QurbanCitizenType[] | null
  sacrificialAnimalsData?: SacrificialAnimalType[] | null
}

export const ContextPageQurbanRegistrations = createContext<IContextPageAdminQurbanRegistrationsBase>(null)