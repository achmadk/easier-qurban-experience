import { object, string, array } from 'yup';

import { IControllerCoreGetValidator } from "controllers/core";

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_VALIDATOR_CLIENT =
  'ControllerQurbanRegistrationAdminAddOrUpdateGetValidatorClient'

export function useControllerQurbanRegistrationAdminAddOrUpdateGetValidatorClient(): IControllerCoreGetValidator {
  const getValidator = () =>
    object({
    sacrificialAnimalId: string().required().defined(),
    qurbanEventId: string().required().defined(),
    participantIds: array().of(string()).min(1).required().defined()
  })
    .required()
    .defined()

    return {
    getValidator,
  }
}