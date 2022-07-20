import type { NextApiHandler } from 'next'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IControllerCoreHandleAPIRoute<ResponseType = any> {
  handleAPIRoute: NextApiHandler<ResponseType>
}