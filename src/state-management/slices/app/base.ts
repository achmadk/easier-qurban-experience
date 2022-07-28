import { createAction } from '@reduxjs/toolkit'

const name = 'app'

export const logout = createAction(`${name}/logout`)

// export const reduxSliceAppBase = createSlice