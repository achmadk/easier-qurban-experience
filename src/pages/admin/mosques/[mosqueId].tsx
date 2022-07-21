import { GetStaticProps, GetStaticPaths } from 'next'

import Link from 'next/link'

import { useControllerCoreRouterIsParamsReady } from 'controllers'

import { IRouteCoreMosqueBase } from 'routes'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AdminMosqueIDProps extends IRouteCoreMosqueBase {}

export default function AdminMosqueID<
  PropType extends AdminMosqueIDProps = AdminMosqueIDProps
>(props: PropType) {
  const { checkValidCondition: checkParamsIsReady } =
    useControllerCoreRouterIsParamsReady<PropType>()

  const paramsIsReady = checkParamsIsReady(props)

  if (paramsIsReady) {
    const { mosqueId } = props
    return (
      <>
        <div>{JSON.stringify(props)}</div>
        <Link href={`/admin/mosques/${mosqueId}/events/a12b3c`}>
          Go To Specified event
        </Link>
      </>
    )
  }
  return 'Loading...'
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