/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetStaticProps, GetStaticPaths } from 'next'
import { useState, useEffect } from 'react'

import { HeaderMosque } from 'components/03-organisms/header/mosque/Base'
import { SidebarAdmin } from 'components/03-organisms/sidebars/admin/Base'
import { ListSidebarAdminOtherList } from 'components/02-molecules/lists/sidebar/admin/OtherList'
import { ListSidebarAdminMosqueNavigation } from 'components/02-molecules/lists/sidebar/admin/MosqueNavigation'
import { FooterAdmin } from 'components/03-organisms/footer/Admin'
import { ComponentOrganismFormQurbanRegistrationAdd } from 'components/03-organisms/forms/qurban-registration/add/Base'
import { ListSidebarAdminQurbanEventNavigation } from 'components/02-molecules/lists/sidebar/admin/QurbanEventNavigation'
import { TableAdminQurbanRegistrationCompleteInteraction } from 'components/03-organisms/tables/admin/qurban-registrations/CompleteInteraction'

import { ContextPageQurbanRegistrations } from 'contexts'

import {
  useControllerCoreRouterIsParamsReady,
  useControllerMosqueAdminFindGetDataClient,
  useControllerQurbanCitizenAdminFindGetResourceDataClient,
  useControllerQurbanEventAdminFindGetResourceDataClient,
  useControllerQurbanRegistrationAdminFindGetResourceDataClient,
  useControllerSacrificialAnimalSharedGetResourceDataClient
} from 'controllers'

import { IRouteCoreMosqueBase } from 'routes'
import { IModelQurbanRegistrationWithID } from 'models'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminMosqueIDQurbanRegistrationsProps extends IRouteCoreMosqueBase {
  qurbanEventId: string
}

export default function AdminMosqueIDQurbanRegistrations<
  PropType extends AdminMosqueIDQurbanRegistrationsProps = AdminMosqueIDQurbanRegistrationsProps,
  QurbanRegistrationDataType extends IModelQurbanRegistrationWithID = IModelQurbanRegistrationWithID
>(props: PropType) {
  const [mode, setMode] = useState<'VIEW' | 'CREATE' | 'UPDATE'>('VIEW')
  const [selectedQurbanRegistrationData, setSelectedQurbanRegistrationData] = useState<QurbanRegistrationDataType | null>(null)
  const [triggerLoadData, setTriggerLoadData] = useState(false)
  const [
    triggerLoadQurbanRegistrationData,
    setTriggerLoadQurbanRegistrationData
  ] = useState(false)
  const { checkValidCondition: checkParamsIsReady } =
    useControllerCoreRouterIsParamsReady<PropType>()

  const { getData: getMosqueData } =
    useControllerMosqueAdminFindGetDataClient()
  const { getData: getQurbanEventsData } =
    useControllerQurbanEventAdminFindGetResourceDataClient()
  const { data: qurbanCitizensData, getData: getQurbanCitizensData } =
    useControllerQurbanCitizenAdminFindGetResourceDataClient()
  const { data: sacrificialAnimalsData, getData: getSacrificialAnimalsData } =
    useControllerSacrificialAnimalSharedGetResourceDataClient()
  const { data: qurbanRegistrationsData, getData: getQurbanRegistrationData } =
    useControllerQurbanRegistrationAdminFindGetResourceDataClient<QurbanRegistrationDataType>()

  const paramsIsReady = checkParamsIsReady(props)

  const getData = async ({ mosqueId, qurbanEventId }: PropType) => {
    await getMosqueData({ mosqueId })
    await getQurbanEventsData({ mosqueId, qurbanEventId })
    await getQurbanCitizensData(qurbanEventId)
    await getQurbanRegistrationData(qurbanEventId)
    await getSacrificialAnimalsData()
  }

  const toggleMode = (value?: 'CREATE' | 'VIEW' | 'UPDATE') => {
    setMode(value ?? 'VIEW')
  }

  const contextValue = {
    mode,
    toggleMode,
    qurbanCitizensData,
    sacrificialAnimalsData,
    setTriggerLoadData: setTriggerLoadQurbanRegistrationData,
    qurbanRegistrationsData,
    selectedQurbanRegistrationData,
    setSelectedQurbanRegistrationData,
  }

  useEffect(() => {
    if (paramsIsReady) {
      setTriggerLoadData(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsIsReady])

  useEffect(() => {
    if (triggerLoadData) {
      getData(props)
      setTriggerLoadData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerLoadData])

  useEffect(() => {
    if (triggerLoadQurbanRegistrationData) {
      getQurbanRegistrationData(props.qurbanEventId)
      setTriggerLoadQurbanRegistrationData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerLoadQurbanRegistrationData])

  return (
    <>
      {/** @ts-ignore */}
      <SidebarAdmin>
        <ListSidebarAdminQurbanEventNavigation />
        <ListSidebarAdminMosqueNavigation navigationForPage="QURBAN_EVENTS" />
        <ListSidebarAdminOtherList />
      </SidebarAdmin>
      <div className="relative md:ml-64 bg-blueGray-50">
        {!paramsIsReady && 'Loading...'}
        {paramsIsReady && (
          <ContextPageQurbanRegistrations.Provider value={contextValue}>
            <HeaderMosque headerType="QURBAN_EVENT_REGISTRATION" />
            <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12" />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <div className="flex flex-wrap mt-4">
                { ['CREATE', 'UPDATE'].includes(mode) && <ComponentOrganismFormQurbanRegistrationAdd />}
                { mode === 'VIEW' && <TableAdminQurbanRegistrationCompleteInteraction />}
              </div>
              <FooterAdmin />
            </div>
          </ContextPageQurbanRegistrations.Provider>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { mosqueId: '1', qurbanEventId: '1' } }]
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params: props }) => {
  return {
    props
  }
}