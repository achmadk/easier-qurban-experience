import { ICitizenBase, ICitizenWithID } from 'models/user/citizen'
import { type Dispatch, type SetStateAction, createContext } from 'react'

export interface IContextPageAdminCitizensBase<
  CitizenType extends ICitizenBase = ICitizenBase,
  CitizenWithIDType extends ICitizenWithID = ICitizenWithID
> {
  isAddBatch: boolean
  setIsAddBatch: Dispatch<SetStateAction<boolean>>
  addedCitizens: CitizenType[]
  setAddedCitizens: Dispatch<SetStateAction<CitizenType[]>>
  triggerReloadMosqueData: boolean
  setTriggerReloadMosqueData: Dispatch<SetStateAction<boolean>>
  citizenData: CitizenWithIDType[] | null
}

export const ContextPageAdminCitizens = createContext<IContextPageAdminCitizensBase>(null as unknown as IContextPageAdminCitizensBase)
