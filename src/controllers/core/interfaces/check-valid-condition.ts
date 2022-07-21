export interface IControllerCoreCheckValidCondition<
  InputType = unknown
> {
  checkValidCondition(input?: InputType): boolean
}