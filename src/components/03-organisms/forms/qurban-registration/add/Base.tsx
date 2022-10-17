/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Formik, Form, FormikProps, FormikHelpers } from 'formik'
import { useContext, useState, useEffect, ChangeEvent } from 'react'
import { useContainerGet } from 'inversify-hooks-esm'
import { object, string, array } from 'yup'
import { useSelector } from 'react-redux'

// @ts-ignore
// import { Datepicker } from 'flowbite-datepicker'
import { Select /*, Label */ } from 'flowbite-react'

import { ContextPageQurbanRegistrations } from 'contexts'

import { addRefProps, PropsWithInnerRef } from "utils"
import {
  IControllerCoreHandleSubmit,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
} from 'controllers'

import { IModelQurbanEventWithID, IModelQurbanRegistrationRequestBody, IModelSacrificialAnimalWithId } from "models"
import { getQurbanEventId } from 'state-management'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentOrganismFormQurbanRegistrationAddBaseProps
  extends PropsWithInnerRef<HTMLFormElement> {}

export const ComponentOrganismFormQurbanRegistrationAddBase = <
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody,
  PropType extends ComponentOrganismFormQurbanRegistrationAddBaseProps = ComponentOrganismFormQurbanRegistrationAddBaseProps,
  OutputType extends IModelQurbanEventWithID = IModelQurbanEventWithID,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId
>({ innerRef }: PropType) => {
  const { toggleMode, sacrificialAnimalsData, qurbanCitizensData, setTriggerLoadData } = useContext(ContextPageQurbanRegistrations)
  const qurbanEventId = useSelector(getQurbanEventId)
  const qurbanRegistrationAddCtrl = useContainerGet<IControllerCoreHandleSubmit<InputType, OutputType>>(
    CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
  )
  const [selectedSacrificialAnimal, setSelectedSacrificialAnimal] = useState<SacrificialAnimalType | null>(null)
  const initialValue: InputType = {
    sacrificialAnimalId: sacrificialAnimalsData?.[0]?.id ?? null,
    qurbanEventId,
    participantIds: qurbanCitizensData?.[0]?.id ? [qurbanCitizensData[0].id] : [],
  } as InputType

  const validationSchema = object({
    sacrificialAnimalId: string().required().defined(),
    qurbanEventId: string().required().defined(),
    participantIds: array().of(string()).min(1).required().defined()
  })
    .required()
    .defined()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (input: InputType, helpers: FormikHelpers<InputType>) => {
    try {
      await qurbanRegistrationAddCtrl.handleSubmit(input, helpers)
    } finally {
      setTriggerLoadData(true)
      toggleMode('VIEW')
    }
  }

  useEffect(() => {
    if (selectedSacrificialAnimal === null && initialValue.sacrificialAnimalId !== null) {
      const newSelectedSacrificialAnimal = (sacrificialAnimalsData as SacrificialAnimalType[])
        ?.find((item) => item.id === initialValue.sacrificialAnimalId) ?? null
      setSelectedSacrificialAnimal(newSelectedSacrificialAnimal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue.sacrificialAnimalId, selectedSacrificialAnimal])

  // useEffect(() => {
  //   if (selectedSacrificialAnimal !== null && selectedSacrificialAnimal.maximalUser && )
  // }, [selectedSacrificialAnimal])

  return (
    <Formik enableReinitialize initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, dirty, isValid, handleChange, values, setFieldValue }: FormikProps<InputType>) => {
        const handleParticipantIdsChange = (index: number) => (event: ChangeEvent<HTMLSelectElement>) => {
          const { value } = event.target
          const newParticipantIdsValue = [...values.participantIds.slice(0, index), value, ...values.participantIds.slice(index + 1)]
          console.log(newParticipantIdsValue)
          setFieldValue('participantIds', newParticipantIdsValue)
        }
        return (
          <Form ref={innerRef} className="w-full lg:w-6/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
              <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold">Add Qurban Registration</h4>
              <div className="relative w-full mb-3 mt-8">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="sacrificialAnimalId">
                  Sacrificial Animal
                </label>
                <Select
                  id="sacrificialAnimalId"
                  name="sacrificialAnimalId"
                  disabled={isSubmitting}
                  onChange={(event) => {
                    const id = event.target.value
                    handleChange(event)
                    const selectedSacrificialAnimal = (sacrificialAnimalsData as SacrificialAnimalType[])
                      ?.find((item) => item.id === id) ?? null
                    setSelectedSacrificialAnimal(selectedSacrificialAnimal)
                  }}>
                  {sacrificialAnimalsData?.map((item, index) => (
                    <option defaultChecked={index === 0} value={item.id} key={`sacrificial-animal-item-${index}`} className="flex items-center gap-4">
                      {item.name}
                    </option>
                  )) ?? false}
                </Select>
              </div>
              {selectedSacrificialAnimal?.maximalUser
                && selectedSacrificialAnimal.maximalUser > 0
                && Array.from({ length: selectedSacrificialAnimal.maximalUser }, (_v, i) => i)
                .map((index) => (
                  <div key={`participant-id-${index}`} className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor={`participantIds[${index}]`}>
                      {`Participant #${index + 1}`}
                    </label>
                    <div className="relative">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i className="fas fa-user text-blueGray-300 mr-2 text-sm" style={{ width: '1rem' }} />
                      </div>
                      <Select
                        id={`participantIds[${index}]`}
                        name={`participantIds[${index}]`}
                        // className="pl-10 p-2.5 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={`Select Participant #${index + 1}`}
                        disabled={isSubmitting}
                        onChange={handleParticipantIdsChange(index)}>
                        {qurbanCitizensData?.map((item, index) => (
                          <option defaultChecked={false} value={item.id} key={`participant-item-${index}`} className="flex items-center gap-4">
                            {`${item.name} - ${item.phoneNumber}`}
                          </option>
                        )) ?? false}
                      </Select>
                    </div>
                  </div>
                ))}
              <div className="relative w-full mb-3">
                <div className="text-center mt-6">
                  <button
                    className="bg-white text-red-600 active:bg-gray-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="reset"
                    onClick={() => toggleMode('VIEW')}>
                    Cancel
                  </button>
                  <button
                    className="bg-blue-700 text-white active:bg-blue-700 disabled:bg-light-600 disabled:text-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    disabled={!dirty || !isValid || isSubmitting}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}}  
    </Formik>
  )
}

export const ComponentOrganismFormQurbanRegistrationAdd = addRefProps<HTMLFormElement>(
  ComponentOrganismFormQurbanRegistrationAddBase
)