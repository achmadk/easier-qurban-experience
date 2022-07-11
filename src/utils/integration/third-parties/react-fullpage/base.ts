import dynamic from 'next/dynamic'

import FullPage from '@fullpage/react-fullpage'

export const ReactFullPage = FullPage

export const ReactFullPageWrapper = FullPage.Wrapper

export const ReactFullPageDynamic = dynamic(() => import('@fullpage/react-fullpage'), {
  ssr: false
})

// export const ReactFullPageWrapper = ReactFullPage.Wrapper
