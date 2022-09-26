import { createSelector } from "@reduxjs/toolkit"

import { getMosqueData } from "./base"

export const getQurbanEventData = createSelector(getMosqueData, (data) => data?.qurbanEvent ?? null)

export const getQurbanEventId = createSelector(getQurbanEventData, (data) => data?.id ?? null)

export const getQurbanEventYearExecution = createSelector(getQurbanEventData, (data) => data?.yearExecution ?? null)

export const checkQurbanEventDataEmpty = createSelector(getQurbanEventData, (data) => !data)