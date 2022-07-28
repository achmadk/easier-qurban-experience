import { GetStaticPaths, GetStaticProps } from 'next'

import { useControllerCoreRouterIsParamsReady } from 'controllers'

import { IRouteCoreMosqueBase, IRouteCoreMosqueEventBase } from 'routes'

export interface AdminMosqueEventIDProps
  extends IRouteCoreMosqueBase, IRouteCoreMosqueEventBase {}

export default function AdminMosqueEventID<
  PropType extends AdminMosqueEventIDProps = AdminMosqueEventIDProps
>(props: PropType) {
  const { checkValidCondition: checkParamsIsReady } =
    useControllerCoreRouterIsParamsReady<PropType>()

  const paramsIsReady = checkParamsIsReady(props)

  if (paramsIsReady) {
    return (
      <div>{JSON.stringify(props)}</div>
    )
  }
  return 'Loading...'
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