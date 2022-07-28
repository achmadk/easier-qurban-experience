import axios, { AxiosError } from 'axios'

export const SERVICE_CORE_REMOTE_BASE =
  'ServiceCoreRemoteBase'

export function getServiceCoreRemoteBase() {
  const instance = axios.create({
    baseURL: '/api/v1',
    timeout: 60000
  })
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      return Promise.reject(error.response)
    }
  )
  return instance
}