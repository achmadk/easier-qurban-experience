import { NextApiRequest, NextApiResponse } from "next";

import { DefaultCitizenAdminCreateManyRequestBody, getControllerCoreDecryptionTransformRequestBodyServer, IControllerCoreHandleAPIRoute } from "controllers";
import { getControllerCitizenAdminFindGetResourceData } from "./get-resource-data.server";

export const CONTROLLER_CITIZEN_ADMIN_FIND_HANDLE_API_ROUTE_SERVER =
  'ControllerCitizenAdminFindHandleAPIRouteServer'

export function getControllerCitizenAdminFindHandleAPIRouteServer<
  BodyType extends DefaultCitizenAdminCreateManyRequestBody = DefaultCitizenAdminCreateManyRequestBody
>(): IControllerCoreHandleAPIRoute {
    
  const handleAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { transformRequestBody } = getControllerCoreDecryptionTransformRequestBodyServer<BodyType>()
    const { getData: getSavedCitizenData } = getControllerCitizenAdminFindGetResourceData()

    try {
      const { query } = req.query as { query: string }
      const { mosqueId } = await transformRequestBody(query)
      const savedCitizens = await getSavedCitizenData(mosqueId)
      res.status(200).json({ data: savedCitizens })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  return {
    handleAPIRoute
  }
}