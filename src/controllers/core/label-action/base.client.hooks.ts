import { IControllerCoreGetComputedResource } from "../interfaces";

export interface DefaultModeValues {
  value: 'CREATE' | 'VIEW' | 'UPDATE'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IControllerCoreGetLabelAction<
  ModeType extends DefaultModeValues = DefaultModeValues
> extends IControllerCoreGetComputedResource<string, ModeType['value']> {}

export const CONTROLLER_CORE_LABEL_ACTION_BASE_CLIENT
  = 'ControllerCoreLabelActionBaseClient'

export function useControllerCoreLabelActionBaseClient<
  ModeType extends DefaultModeValues = DefaultModeValues
>(): IControllerCoreGetLabelAction<ModeType> {
  const getComputedResource = (initialMode?: ModeType['value']) => {
    const mode = initialMode ?? 'CREATE' as ModeType['value']
    switch (mode) {
      case 'UPDATE':
        return 'Update'
      case 'CREATE':
      default:
        return 'Add'
    }
  }
  return {
    getComputedResource,
  }
}