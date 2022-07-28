import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "state-management";

export const getMosqueData = (state: AppState) => state.mosque.data

export const getMosqueID = createSelector(getMosqueData, (data) => data?.id ?? null)

export const getMosqueName = createSelector(getMosqueData, (data) => data?.name ?? null)

export const checkMosqueDataEmpty = createSelector(getMosqueData, (data) => !data)