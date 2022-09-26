import { IModelCoreOnlyID, IModelSacrificialAnimalWithId, IUserWithID } from "models";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IModelQurbanRegistrationBase<
  ParticipantType extends IUserWithID = IUserWithID,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId
> {
  qurbanEventId: string
  sacrificialAnimal: SacrificialAnimalType
  participants: ParticipantType[]
}

export interface IModelQurbanRegistrationWithID
  extends IModelQurbanRegistrationBase, IModelCoreOnlyID {}

export interface IModelQurbanRegistrationRequestBody<
  ParticipantType extends IUserWithID = IUserWithID,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId
> {
  qurbanEventId: string
  sacrificialAnimalId: SacrificialAnimalType['id']
  participantIds: ParticipantType['id'][]
}