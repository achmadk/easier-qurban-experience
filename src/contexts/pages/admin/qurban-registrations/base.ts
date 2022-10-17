import { createContext, Dispatch, SetStateAction } from "react"

import { IModelQurbanRegistrationWithID, IModelSacrificialAnimalWithId, ICitizenWithID } from "models"

export interface IContextPageAdminQurbanRegistrationsBase<
  QurbanRegistrationType extends IModelQurbanRegistrationWithID = IModelQurbanRegistrationWithID,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId,
  QurbanCitizenType extends ICitizenWithID = ICitizenWithID,
> {
  mode: 'CREATE' | 'VIEW'
  toggleMode(mode?: 'CREATE' | 'VIEW'): void
  qurbanRegistrationsData?: QurbanRegistrationType[] | null
  qurbanCitizensData?: QurbanCitizenType[] | null
  sacrificialAnimalsData?: SacrificialAnimalType[] | null
  setTriggerLoadData: Dispatch<SetStateAction<boolean>>
}

export const ContextPageQurbanRegistrations = createContext<IContextPageAdminQurbanRegistrationsBase>(null)