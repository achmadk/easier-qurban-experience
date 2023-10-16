import { createContext, Dispatch, SetStateAction } from "react"

import { IModelQurbanRegistrationWithID, IModelSacrificialAnimalWithId, ICitizenWithID } from "models"

export interface IContextPageAdminQurbanRegistrationsBase<
  QurbanRegistrationType extends IModelQurbanRegistrationWithID = IModelQurbanRegistrationWithID,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId,
  QurbanCitizenType extends ICitizenWithID = ICitizenWithID,
> {
  mode: 'CREATE' | 'VIEW' | 'UPDATE'
  /**
   *
   *
   * @param {('CREATE' | 'VIEW' | 'UPDATE')} [mode] @default 'VIEW'
   * @memberof IContextPageAdminQurbanRegistrationsBase
   */
  toggleMode(mode?: 'CREATE' | 'VIEW' | 'UPDATE'): void
  qurbanRegistrationsData?: QurbanRegistrationType[] | null
  qurbanCitizensData?: QurbanCitizenType[] | null
  sacrificialAnimalsData?: SacrificialAnimalType[] | null
  setTriggerLoadData: Dispatch<SetStateAction<boolean>>
  selectedQurbanRegistrationData: QurbanRegistrationType | null
  setSelectedQurbanRegistrationData: Dispatch<SetStateAction<QurbanRegistrationType | null>>
}

export const ContextPageQurbanRegistrations = createContext<IContextPageAdminQurbanRegistrationsBase>(null as unknown as IContextPageAdminQurbanRegistrationsBase)
