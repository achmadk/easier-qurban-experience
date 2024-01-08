/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Formik, Form, FormikProps } from 'formik'
import { useContext, useState, useEffect, ChangeEvent } from 'react'
import { useContainerGet } from 'inversify-hooks-esm'

import { Select } from 'flowbite-react'

import { ContextPageQurbanRegistrations } from 'contexts'

import { addRefProps, PropsWithInnerRef } from "utils"
import {
  IControllerCoreHandleSubmit,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_INITIAL_VALUE_CLIENT,
  IControllerCoreGetInitialValue,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_VALIDATOR_CLIENT,
  IControllerCoreGetValidator,
  CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_HANDLE_SUBMIT_CLIENT,
  IControllerCoreGetLabelAction,
  CONTROLLER_CORE_LABEL_ACTION_BASE_CLIENT
} from 'controllers'

import { IModelQurbanRegistrationRequestBody, IModelSacrificialAnimalWithId } from "models"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentOrganismFormQurbanRegistrationAddBaseProps
  extends PropsWithInnerRef<HTMLFormElement> {}

export const ComponentOrganismFormQurbanRegistrationAddBase = <
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody,
  PropType extends ComponentOrganismFormQurbanRegistrationAddBaseProps = ComponentOrganismFormQurbanRegistrationAddBaseProps,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId
>({ innerRef }: PropType) => {
  const {
    mode,
    toggleMode,
    sacrificialAnimalsData,
    qurbanCitizensData,
  } = useContext(ContextPageQurbanRegistrations)

  const qurbanRegistrationHandleSubmitCtrl = useContainerGet<IControllerCoreHandleSubmit<InputType>>(
    CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_HANDLE_SUBMIT_CLIENT
  )
  const qurbanRegistrationInitialValueCtrl = useContainerGet<IControllerCoreGetInitialValue<InputType>>(
    CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_INITIAL_VALUE_CLIENT
  )
  const qurbanRegistrationValidatorCtrl = useContainerGet<IControllerCoreGetValidator>(
    CONTROLLER_QURBAN_REGISTRATION_ADMIN_ADD_OR_UPDATE_GET_VALIDATOR_CLIENT
  )
  const labelActionCtrl = useContainerGet<IControllerCoreGetLabelAction>(
    CONTROLLER_CORE_LABEL_ACTION_BASE_CLIENT
  )
  const [selectedSacrificialAnimal, setSelectedSacrificialAnimal] = useState<SacrificialAnimalType | null>(null)
  const initialValue = qurbanRegistrationInitialValueCtrl.getInitialValue()
  const labelAction = labelActionCtrl.getComputedResource(mode)

  const validationSchema = qurbanRegistrationValidatorCtrl.getValidator()


  useEffect(() => {
    if (selectedSacrificialAnimal === null && initialValue.sacrificialAnimalId !== null) {
      const newSelectedSacrificialAnimal = (sacrificialAnimalsData as SacrificialAnimalType[])
        ?.find((item) => item.id === initialValue.sacrificialAnimalId) ?? null
      setSelectedSacrificialAnimal(newSelectedSacrificialAnimal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue.sacrificialAnimalId, selectedSacrificialAnimal])

  return (
    <Formik
      enableReinitialize
      initialValues={initialValue}
      onSubmit={qurbanRegistrationHandleSubmitCtrl.handleSubmit}
      validationSchema={validationSchema}>
      {({ isSubmitting, dirty, isValid, handleChange, values, setFieldValue }: FormikProps<InputType>) => {
        const handleParticipantIdsChange = (index: number) => (event: ChangeEvent<HTMLSelectElement>) => {
          const { value } = event.target
          const newParticipantIdsValue = [...values.participantIds.slice(0, index), value, ...values.participantIds.slice(index + 1)]
          setFieldValue('participantIds', newParticipantIdsValue)
        }
        return (
          <Form ref={innerRef} className="w-full lg:w-6/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
              <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold">{`${labelAction} Qurban Registration`}</h4>
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
                  value={values.sacrificialAnimalId}
                  onChange={(event) => {
                    const id = event.target.value
                    handleChange(event)
                    const selectedSacrificialAnimal = (sacrificialAnimalsData as SacrificialAnimalType[])
                      ?.find((item) => item.id === id) ?? null
                    setSelectedSacrificialAnimal(selectedSacrificialAnimal)
                  }}>
                  {sacrificialAnimalsData?.map((item, index) => (
                    <option
                      key={`sacrificial-animal-item-${index}`}
                      className="flex items-center gap-4"
                      value={item.id}
                      {...(mode === 'CREATE' ? { defaultChecked: index === 0 } : {})}
                    >
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
                        helperText={`Select Participant #${index + 1}`}
                        disabled={isSubmitting}
                        value={values.participantIds[index]}
                        onChange={handleParticipantIdsChange(index)}>
                        {qurbanCitizensData?.map((item, citizenIndex) => (
                          <option
                            key={`participant-item-${citizenIndex}`}
                            className="flex items-center gap-4"
                            value={item.id}
                            {...(mode === 'CREATE' ? { defaultChecked: false } : {})}
                          >
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
                    {labelAction}
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