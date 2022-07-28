/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetStaticProps, GetStaticPaths } from 'next'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import { HeaderMosque } from 'components/03-organisms/header/mosque/Base'
import { SidebarAdmin } from 'components/03-organisms/sidebars/admin/Base'
import { ListSidebarAdminOtherList } from 'components/02-molecules/lists/sidebar/admin/OtherList'
import { ListSidebarAdminMosqueNavigation } from 'components/02-molecules/lists/sidebar/admin/MosqueNavigation'
import { FooterAdmin } from 'components/03-organisms/footer/Admin'

import { ContextPageAdminCitizens } from 'contexts'

import { useControllerCitizenAdminFindGetResourceDataClient, useControllerCoreRouterIsParamsReady, useControllerMosqueAdminFindGetDataClient } from 'controllers'

import { IRouteCoreMosqueBase } from 'routes'
import { TableAdminCitizensCompleteInteraction } from 'components/03-organisms/tables/admin/citizens/CompleteInteraction'
import { InputFileBatchCreateCitizens } from 'components/02-molecules/inputs/file/BatchCreateCitizens'
import { ICitizenBase, ICitizenWithID } from 'models/user/citizen'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminMosqueIDCitizensProps extends IRouteCoreMosqueBase {}

export default function AdminMosqueIDCitizens<
  CitizenType extends ICitizenBase = ICitizenBase,
  CitizenWithIDType extends ICitizenWithID = ICitizenWithID,
  PropType extends AdminMosqueIDCitizensProps = AdminMosqueIDCitizensProps
>(props: PropType) {
  const [isAddBatch, setIsAddBatch] = useState(false)
  const [addedCitizens, setAddedCitizens] = useState<CitizenType[]>([])
  const [
    triggerReloadMosqueData,
    setTriggerReloadMosqueData
  ] = useState(false)

  const { checkValidCondition: checkParamsIsReady } =
    useControllerCoreRouterIsParamsReady<PropType>()

  const { data: citizenData, getData: getCitizenData } =
    useControllerCitizenAdminFindGetResourceDataClient<CitizenWithIDType>()
  
  const { getData: getMosqueData } =
    useControllerMosqueAdminFindGetDataClient()

  const providerValue = {
    isAddBatch,
    setIsAddBatch,
    addedCitizens,
    setAddedCitizens,
    triggerReloadMosqueData,
    setTriggerReloadMosqueData,
    citizenData
  }

  const paramsIsReady = checkParamsIsReady(props)

  const getData = async (mosqueId) =>
    await Promise.all([
      getMosqueData({ mosqueId }),
      getCitizenData(mosqueId)
    ])

  useEffect(() => {
    if (props?.mosqueId) {
      getData(props.mosqueId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mosqueId])

  useEffect(() => {
    if (props?.mosqueId && triggerReloadMosqueData) {
      getData(props.mosqueId)
      setTriggerReloadMosqueData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReloadMosqueData])

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
          <ContextPageAdminCitizens.Provider value={providerValue} >
            <HeaderMosque headerType="CITIZENS" />
            <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
              <div className="px-4 md:px-10 mx-auto w-full">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 cursor-pointer">
                      <div
                        className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div
                              className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5
                                className="text-blueGray-400 uppercase font-bold text-xs">
                                Missing Email address
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                100
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div
                                className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <i className="fas fa-envelope" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 xl:w-3/12 px-4 cursor-pointer">
                      <div
                        className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                          <div className="flex flex-wrap">
                            <div
                              className="relative w-full pr-4 max-w-full flex-grow flex-1">
                              <h5
                                className="text-blueGray-400 uppercase font-bold text-xs">
                                Missing Phone Number
                              </h5>
                              <span className="font-semibold text-xl text-blueGray-700">
                                1
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div
                                className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <i className="fas fa-mobile-screen" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link href={`/assets/doc/add-batch-citizens.xlsx`}>
                      <a className="w-full lg:w-6/12 xl:w-3/12 px-4 cursor-pointer">
                        <div
                          className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                          <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                              <div
                                className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5
                                    className="text-blueGray-400 uppercase font-bold text-xs">
                                    Download add batch citizen file
                                </h5>
                                <span className="font-semibold text-xl text-white">1</span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                <div
                                    className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500">
                                    <i className="fas fa-file-excel" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <div className="flex flex-wrap mt-4">
                {isAddBatch && <InputFileBatchCreateCitizens />}
                <TableAdminCitizensCompleteInteraction />
              </div>
              <FooterAdmin />
            </div>
          </ContextPageAdminCitizens.Provider>
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