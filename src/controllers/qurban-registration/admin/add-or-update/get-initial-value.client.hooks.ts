import { useContext } from "react";
import { useSelector } from "react-redux";

import { ContextPageQurbanRegistrations } from "contexts";

import { getQurbanEventId } from "state-management";

import { IControllerCoreGetInitialValue } from "controllers/core";
import { IModelQurbanRegistrationRequestBody } from "models";

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_INITIAL_VALUE_CLIENT
  = 'ControllerQurbanRegistrationAdminAddOrUpdateGetInitialValueClient'

export function useControllerQurbanRegistrationAdminAddOrUpdateGetInitialValueClient<
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody
>(): IControllerCoreGetInitialValue<InputType> {
  const {
    mode,
    sacrificialAnimalsData,
    qurbanCitizensData,
    selectedQurbanRegistrationData,
  } = useContext(ContextPageQurbanRegistrations)
  const qurbanEventId = useSelector(getQurbanEventId)

  const getInitialValue = (): InputType => {
    if (mode === 'UPDATE' && selectedQurbanRegistrationData !== null) {
      const { id, sacrificialAnimal, qurbanEventId, participants } = selectedQurbanRegistrationData
      return {
        id,
        sacrificialAnimalId: sacrificialAnimal.id,
        qurbanEventId,
        participantIds: participants.map((item) => item.id),
      } as InputType
    }
    return {
      id: null,
      sacrificialAnimalId: sacrificialAnimalsData?.[0]?.id ?? null,
      qurbanEventId,
      participantIds: qurbanCitizensData?.[0]?.id ? [qurbanCitizensData[0].id] : [],
    } as InputType
  }
  return {
    getInitialValue,
  }
}
