import { useMemo, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { container } from 'inversify-hooks-esm'

import {
  CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT,
  CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT,
  IControllerCoreHandleSubmit,
  IControllerCoreLogout,
  useControllerMosqueAdminFindGetResourceDataClient
} from 'controllers'
import { IMosqueBase } from 'models'

export default function AdminHome<InputType extends IMosqueBase = IMosqueBase>() {
  const { user } = useUser()
  const logoutCtrl = useMemo(() =>
    container.get<IControllerCoreLogout>(
      CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT
    )
  , [])
  const mosqueRegisterCtrl = useMemo(() =>
    container.get<IControllerCoreHandleSubmit<InputType>>(
      CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT
    )
  , [])

  const { data: mosqueData, getData: getMosqueData } =
    useControllerMosqueAdminFindGetResourceDataClient()

  const handleRegisterMosqueClicked = async () => {
    const dummyInput = { name: 'Baabussalam Mosque' } as InputType
    await mosqueRegisterCtrl.handleSubmit(dummyInput)
  }

  useEffect(() => {
    getMosqueData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(mosqueData, process.env.JWT_SECRET_KEY)

  return (
    <div className="container mx-auto">
      <h1>{`Welcome ${user?.fullName ?? '-'}`}</h1>
      <button className="button" onClick={handleRegisterMosqueClicked}>Register</button>
      <button className="button" onClick={logoutCtrl.logout}>Logout</button>
    </div>
  )
}