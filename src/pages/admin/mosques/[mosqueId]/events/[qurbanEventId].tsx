/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

// import Link from 'next/link'
import { SidebarAdmin } from 'components/03-organisms/sidebars/admin/Base'
import { ListSidebarAdminMosqueNavigation } from 'components/02-molecules/lists/sidebar/admin/MosqueNavigation'
import { ListSidebarAdminOtherList } from 'components/02-molecules/lists/sidebar/admin/OtherList'
import { HeaderMosque } from 'components/03-organisms/header/mosque/Base'
import { FooterAdmin } from 'components/03-organisms/footer/Admin'

import { useControllerCoreRouterIsParamsReady, useControllerMosqueAdminFindGetDataClient, useControllerQurbanEventAdminFindGetResourceDataClient } from 'controllers'

import { IRouteCoreMosqueBase, IRouteCoreMosqueEventBase } from 'routes'
import { IModelQurbanEventWithID } from 'models'
import { ListSidebarAdminQurbanEventNavigation } from 'components/02-molecules/lists/sidebar/admin/QurbanEventNavigation'

export interface AdminMosqueEventIDProps
  extends IRouteCoreMosqueBase, IRouteCoreMosqueEventBase {}

export default function AdminMosqueEventID<
  PropType extends AdminMosqueEventIDProps = AdminMosqueEventIDProps,
  QurbanEventDataType extends IModelQurbanEventWithID = IModelQurbanEventWithID
>(props: PropType) {
  const [triggerLoadData, setTriggerLoadData] = useState(false)
  const { checkValidCondition: checkParamsIsReady } =
    useControllerCoreRouterIsParamsReady<PropType>()

  const { getData: getMosqueData } =
    useControllerMosqueAdminFindGetDataClient()
  const { data: qurbanEventsData, getData: getQurbanEventsData } =
    useControllerQurbanEventAdminFindGetResourceDataClient<QurbanEventDataType>()

  const paramsIsReady = checkParamsIsReady(props)

  const getData = async () => {
    await getMosqueData({ mosqueId: props.mosqueId })
    await getQurbanEventsData({
      mosqueId: props.mosqueId,
      qurbanEventId: props.qurbanEventId
    })
  }

  useEffect(() => {
    if (paramsIsReady) {
      setTriggerLoadData(true)
    }
  }, [paramsIsReady])

  useEffect(() => {
    if (triggerLoadData) {
      getData()
      setTriggerLoadData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerLoadData])

  return (
    <>
      {/** @ts-ignore */}
      <SidebarAdmin>
        <ListSidebarAdminQurbanEventNavigation />
        <ListSidebarAdminMosqueNavigation />
        <ListSidebarAdminOtherList />
      </SidebarAdmin>
      <div className="relative md:ml-64 bg-blueGray-50">
        {!paramsIsReady && 'Loading...'}
        {paramsIsReady && (
          <>
            <HeaderMosque headerType="SPECIFIED_QURBAN_EVENT" />
            <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
              <div className="px-4 md:px-10 mx-auto w-full">
                <div className="flex flex-wrap">
                  {/* <Link href={`/admin/mosques/${props.mosqueId}/citizens`}>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 cursor-pointer">
                      <div
                        className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div
                              className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5
                                className="text-blueGray-400 uppercase font-bold text-xs">
                                Citizens
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                {citizenData?.length ?? 0}
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div
                                className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <i className="fas fa-people-group" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href={`/admin/mosques/${props.mosqueId}/events`}>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 cursor-pointer">
                      <div
                        className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div
                              className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5
                                className="text-blueGray-400 uppercase font-bold text-xs">
                                Qurban Events
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                {qurbanEventsData?.length ?? 0}
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div
                                className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <i className="far fa-calendar-days" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <div className="flex flex-wrap mt-4">
                {/* <TableAdminCitizens data={citizenData} />
                <TableAdminQurbanEvent data={qurbanEventsData} /> */}
              </div>
              <FooterAdmin />
            </div>
          </>
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