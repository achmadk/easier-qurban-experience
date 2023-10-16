import { createSlice, createAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { IModelQurbanEventWithID, IMosqueWithID } from 'models'
import { logout } from '../app'

export interface DefaultReduxSliceMosqueBaseState<
  DataType extends IMosqueWithID = IMosqueWithID,
  QurbanEventType extends IModelQurbanEventWithID = IModelQurbanEventWithID
> {
  data: null | (DataType & { qurbanEvent?: null | QurbanEventType })
}

export type DefaultSetQurbanEventDataPayload<
  QurbanEventType extends IModelQurbanEventWithID = IModelQurbanEventWithID
> = QurbanEventType | null

const name = 'mosque'

const hydrate = createAction<{ mosque: DefaultReduxSliceMosqueBaseState }>(HYDRATE)

export const setMosqueData = createAction<DefaultReduxSliceMosqueBaseState['data']>(
  `${name}/setMosqueData`
)

export const setQurbanEventData = createAction<DefaultSetQurbanEventDataPayload>(
  `${name}/setQurbanEventData`
)

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
      .addCase(setQurbanEventData, (state, action) => {
        if (state.data !== null) {
          state.data.qurbanEvent = action.payload
        }
      })
      .addCase(logout, (state) => {
        state.data = null
      })
})
