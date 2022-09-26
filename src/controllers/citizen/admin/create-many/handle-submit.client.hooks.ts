import { useContainerGet } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { SERVICE_CORE_REMOTE_BASE } from 'services';

import { IControllerCoreHandleSubmit, useControllerCoreEncryptionTransformRequestBodyBaseClient } from "controllers/core";
import { ICitizenBase } from "models/user/citizen";
import { useSelector } from 'react-redux';
import { getMosqueID, getQurbanEventId } from 'state-management';

export interface DefaultCitizenAdminCreateManyHandleSubmitClientOptions<
  CitizenType extends ICitizenBase = ICitizenBase
> {
  /**
   * @default 'MOSQUE_CITIZEN'
   */
  fromPage?: 'MOSQUE_CITIZEN' | 'QURBAN_CITIZEN'
  /**
   * only apply if {@link fromPage} is `QURBAN_CITIZENS`
   * @default 'CREATE_MANY_FROM_FILE'
   */
  submitQurbanCitizensType?: 'CREATE_MANY_FROM_MOSQUE_CITIZEN' | 'CREATE_MANY_FROM_FILE'
  citizens?: CitizenType[]
}

export function useControllerCitizenAdminCreateManyHandleSubmitClient<
  CitizenType extends ICitizenBase = ICitizenBase,
  InputType extends DefaultCitizenAdminCreateManyHandleSubmitClientOptions<CitizenType> = DefaultCitizenAdminCreateManyHandleSubmitClientOptions<CitizenType>
>(): IControllerCoreHandleSubmit<InputType> {
  const remoteService = useContainerGet<AxiosInstance>(SERVICE_CORE_REMOTE_BASE)
  const qurbanEventId = useSelector(getQurbanEventId)
  const mosqueId = useSelector(getMosqueID)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { transformRequestBody } = useControllerCoreEncryptionTransformRequestBodyBaseClient<any>()
  const handleSubmit = async (options: InputType) => {
    let path = '/citizens'
    const fromPage = options?.fromPage ?? 'MOSQUE_CITIZEN'
    const type = options?.submitQurbanCitizensType ?? 'CREATE_MANY_FROM_FILE'
    let data = await transformRequestBody({
      mosqueId,
      citizens: options.citizens
    })
    if (fromPage === 'QURBAN_CITIZEN') {
      path = '/qurban_citizens'
      data = await transformRequestBody({
        mosqueId,
        qurbanEventId,
        type,
        ...(type === 'CREATE_MANY_FROM_FILE' ? {
          citizens: options.citizens,
        } : {})
      } as unknown as CitizenType[])
    }
    await toast.promise(
      remoteService.post(path, { data }),
      {
        pending: 'Loading add citizens...',
        success: `Successfully ${type === 'CREATE_MANY_FROM_FILE' ? `add ${options.citizens.length} citizens.` : 'import data from mosque citizens.'}`,
        error: `Error adding citizens`
      }
    )
  }
  return {
    handleSubmit,
  }
}