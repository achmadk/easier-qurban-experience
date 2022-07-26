import { createSlice, createAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { IMosqueWithID } from 'models'
import { logout } from '../app'

export interface DefaultReduxSliceMosqueBaseState<
  DataType extends IMosqueWithID = IMosqueWithID
> {
  data: null | DataType
}

const name = 'mosque'

const hydrate = createAction<{ mosque: DefaultReduxSliceMosqueBaseState }>(HYDRATE)

export const setMosqueData = createAction<DefaultReduxSliceMosqueBaseState['data']>(`${name}/setMosqueData`)

// eslint-disable-next-line @typescript-eslint/ban-types
export const reduxSliceMosqueBase = createSlice<DefaultReduxSliceMosqueBaseState, {}>({
  name,
  initialState: { data: null },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(hydrate, (state, action) => {
        state = action.payload.mosque
      })
      .addCase(setMosqueData, (state, action) => {
        state.data = action.payload
      })
      .addCase(logout, (state) => {
        state.data = null
      })
})
