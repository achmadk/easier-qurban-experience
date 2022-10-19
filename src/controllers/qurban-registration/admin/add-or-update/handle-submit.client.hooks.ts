import { useContext } from "react";
import { FormikHelpers } from "formik";
import { useContainerGet } from "inversify-hooks-esm";

import { ContextPageQurbanRegistrations } from "contexts";

import { IControllerCoreHandleSubmit } from "controllers/core";
import { IModelQurbanRegistrationRequestBody } from "models";
import { CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT, CONTROLLER_QURBAN_REGISTRATION_ADMIN_UPDATE_HANDLE_SUBMIT_CLIENT } from "controllers";

export const CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_HANDLE_SUBMIT_CLIENT
  = 'ControllerQurbanRegistrationAdminAddOrUpdateHandleSubmitClient'

export function useControllerQurbanRegistrationAdminAddOrUpdateHandleSubmitClient<
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody
>(): IControllerCoreHandleSubmit<InputType> {
  const {
    mode,
    toggleMode,
    setTriggerLoadData,
    setSelectedQurbanRegistrationData,
  } = useContext(ContextPageQurbanRegistrations)
  const qurbanRegistrationAddCtrl = useContainerGet<IControllerCoreHandleSubmit<InputType>>(
    CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
  )
  const qurbanRegistrationUpdateCtrl = useContainerGet<IControllerCoreHandleSubmit<InputType>>(
    CONTROLLER_QURBAN_REGISTRATION_ADMIN_UPDATE_HANDLE_SUBMIT_CLIENT
  )
  
  const handleSubmit = async (input: InputType, helpers: FormikHelpers<InputType>) => {
    try {
      switch (mode) {
        case 'UPDATE':
          await qurbanRegistrationUpdateCtrl.handleSubmit(input, helpers)
          break;
        case 'CREATE':
        default:
          await qurbanRegistrationAddCtrl.handleSubmit(input, helpers)
          break;
      }
    } finally {
      setTriggerLoadData(true)
      if (mode === 'UPDATE') {
        setSelectedQurbanRegistrationData(null)
      }
      toggleMode('VIEW')
    }
  }

  return {
    handleSubmit,
  }
}