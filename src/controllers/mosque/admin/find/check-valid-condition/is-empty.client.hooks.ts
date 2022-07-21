import { IControllerCoreCheckValidCondition } from "controllers/core";
import { IMosqueBase } from "models";

export function useControllerMosqueAdminFindCheckValidConditionIsEmpty<
  InputType extends IMosqueBase = IMosqueBase
>(): IControllerCoreCheckValidCondition<InputType[]> {
  const checkValidCondition = (input?: InputType[]) => {
    if (!input || !Array.isArray(input)) {
      return true
    }
    return input.length === 0
  }

  return {
    checkValidCondition
  }
}