import { useClerk } from '@clerk/nextjs'
import router from 'next/router'
import { toast } from 'react-toastify'

import { IControllerCoreLogout } from "controllers/core";

export const CONTROLLER_USER_ADMIN_LOGOUT_BASE_CLIENT = 'ControllerUserAdminLogoutBaseClient'

export function useControllerUserAdminLogoutBaseClient(): IControllerCoreLogout {
  const { signOut } = useClerk()
  
  const logout = () => {
    signOut(() => router.replace('/'))
    toast('You have successfully logout')
  }

  return {
    logout
  }
}