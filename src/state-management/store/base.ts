import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper'

import { reduxSliceMosqueBase } from 'state-management/slices'

const isNotProduction = process.env.NODE_ENV !== 'production'

const makeStore = wrapMakeStore(() => configureStore({
  reducer: {
    mosque: reduxSliceMosqueBase.reducer
  },
  devTools: isNotProduction,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        nextReduxCookieMiddleware({
          subtrees: ['mosque.data']
        })
      )
}))

export const wrapper = createWrapper(makeStore, {debug: isNotProduction })