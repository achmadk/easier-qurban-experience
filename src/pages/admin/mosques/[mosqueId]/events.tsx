/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetStaticProps, GetStaticPaths } from 'next'
import { useState, useEffect } from 'react'

import { HeaderMosque } from 'components/03-organisms/header/mosque/Base'
import { SidebarAdmin } from 'components/03-organisms/sidebars/admin/Base'
import { ListSidebarAdminOtherList } from 'components/02-molecules/lists/sidebar/admin/OtherList'
import { ListSidebarAdminMosqueNavigation } from 'components/02-molecules/lists/sidebar/admin/MosqueNavigation'
import { FooterAdmin } from 'components/03-organisms/footer/Admin'
import { TableAdminQurbanEventCompleteInteraction } from 'components/03-organisms/tables/admin/qurban-events/CompleteInteraction'

import { ContextPageQurbanEvents } from 'contexts'

import { useControllerCoreRouterIsParamsReady, useControllerMosqueAdminFindGetDataClient, useControllerQurbanEventAdminFindGetResourceDataClient } from 'controllers'

import { IRouteCoreMosqueBase } from 'routes'
import { ComponentOrganismFormQurbanEventAdd } from 'components/03-organisms/forms/qurban-event/add/Base'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminMosqueIDQurbanEventsProps extends IRouteCoreMosqueBase {}

export default function AdminMosqueIDQurbanEvents<
  PropType extends AdminMosqueIDQurbanEventsProps = AdminMosqueIDQurbanEventsProps
>(props: PropType) {
  const [mode, setMode] = useState<'VIEW' | 'CREATE'>('VIEW')
  const { checkValidCondition: checkParamsIsReady } =
    useControllerCoreRouterIsParamsReady<PropType>()

  const { getData: getMosqueData } =
    useControllerMosqueAdminFindGetDataClient()
  const { data: qurbanEventsData, getData: getQurbanEventsData } =
    useControllerQurbanEventAdminFindGetResourceDataClient()

  const paramsIsReady = checkParamsIsReady(props)

  const getData = async (mosqueId) => {
    await getMosqueData({ mosqueId })
    await getQurbanEventsData({ mosqueId })
  }

  const toggleMode = (value?: 'CREATE' | 'VIEW') => {
    setMode((prevValue) => ['CREATE', 'VIEW'].includes(value)
      ? value
      : prevValue === 'CREATE' ? 'VIEW' : 'CREATE'
    )
  }

  const contextValue = {
    mode,
    toggleMode,
    qurbanEventsData,
  }

  useEffect(() => {
    if (props?.mosqueId) {
      getData(props.mosqueId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mosqueId])

  useEffect(() => {
    if (props?.mosqueId) {
      getData(props.mosqueId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/** @ts-ignore */}
      <SidebarAdmin>
        <ListSidebarAdminMosqueNavigation />
        <ListSidebarAdminOtherList />
      </SidebarAdmin>
      <div className="relative md:ml-64 bg-blueGray-50">
        {!paramsIsReady && 'Loading...'}
        {paramsIsReady && (
          <ContextPageQurbanEvents.Provider value={contextValue}>
            <HeaderMosque headerType="QURBAN_EVENTS" />
            <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12" />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <div className="flex flex-wrap mt-4">
                { mode === 'CREATE' && <ComponentOrganismFormQurbanEventAdd />}
                { mode === 'VIEW' && <TableAdminQurbanEventCompleteInteraction />}
              </div>
              <FooterAdmin />
            </div>
          </ContextPageQurbanEvents.Provider>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { mosqueId: '1' } }]
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