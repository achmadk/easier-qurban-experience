/* eslint-disable @typescript-eslint/no-explicit-any */
import { IControllerCoreCheckValidCondition } from "controllers/core/interfaces";

export function useControllerCoreRouterIsParamsReady<
  InputType = any
>(): IControllerCoreCheckValidCondition<InputType> {
  const checkValidCondition = (input: InputType) => {
    const castedInput = input as any
    return typeof input === 'object'
      && !Array.isArray(input)
      && Object.keys(castedInput).length > 0
  }
  return {
    checkValidCondition
  }
}