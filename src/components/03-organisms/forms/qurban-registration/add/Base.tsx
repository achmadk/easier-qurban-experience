/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Formik, Form, FormikProps, FormikHelpers } from 'formik'
import { useContext, useState /*, useEffect */ } from 'react'
// import { useContainerGet } from 'inversify-hooks-esm'
import { object, string, array } from 'yup'
// import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

// @ts-ignore
// import { Datepicker } from 'flowbite-datepicker'
import { Select /*, Label */ } from 'flowbite-react'

import { ContextPageQurbanRegistrations } from 'contexts'

import { addRefProps, PropsWithInnerRef } from "utils"
// import {
//   IControllerCoreHandleSubmit,
//   CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
// } from 'controllers'

import { /* IModelQurbanEventWithID, */ IModelQurbanRegistrationRequestBody, IModelSacrificialAnimalWithId } from "models"
import { getQurbanEventId } from 'state-management'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentOrganismFormQurbanRegistrationAddBaseProps
  extends PropsWithInnerRef<HTMLFormElement> {}

export const ComponentOrganismFormQurbanRegistrationAddBase = <
  InputType extends IModelQurbanRegistrationRequestBody = IModelQurbanRegistrationRequestBody,
  PropType extends ComponentOrganismFormQurbanRegistrationAddBaseProps = ComponentOrganismFormQurbanRegistrationAddBaseProps,
  // OutputType extends IModelQurbanEventWithID = IModelQurbanEventWithID,
  SacrificialAnimalType extends IModelSacrificialAnimalWithId = IModelSacrificialAnimalWithId
>({ innerRef }: PropType) => {
  const { toggleMode, sacrificialAnimalsData } = useContext(ContextPageQurbanRegistrations)
  const qurbanEventId = useSelector(getQurbanEventId)
  // const router = useRouter()
  // const qurbanRegistrationAddCtrl = useContainerGet<IControllerCoreHandleSubmit<InputType, OutputType>>(
  //   CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
  // )
  const [selectedSacrificialAnimal, setSelectedSacrificialAnimal] = useState<SacrificialAnimalType | null>(null)
  // const [triggerUpdateMaxParticipants, setTriggerUpdateMaxParticipants] = useState(false)
  const initialValue: InputType = {
    sacrificialAnimalId: sacrificialAnimalsData?.[0]?.id ?? null,
    qurbanEventId,
    participantIds: []
  } as InputType

  const validationSchema = object({
    sacrificialAnimalId: string().required().defined(),
    qurbanEventId: string().required().defined(),
    participantIds: array().of(string()).required().defined()
  })
    .required()
    .defined()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (input: InputType, helpers: FormikHelpers<InputType>) => {
    try {
      console.log(input)
      // const result = await qurbanRegistrationAddCtrl.handleSubmit(input, helpers)
      // router.push(`/admin/mosques/${result.mosqueId}/events/${result.id}`)
    } finally {
      toggleMode('VIEW')
    }
  }

  // useEffect(() => {
  //   let datepicker = null
  //   if (mode === 'CREATE') {
  //     datepicker = new Datepicker(dateExecutionRef.current)
  //   }
  //   return () =>
  //     datepicker.destroy()
  // }, [mode])

  // console.log('datepicker: ', Datepicker)


  return (
    <Formik enableReinitialize initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, dirty, isValid, handleChange, values }: FormikProps<InputType>) => {
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
                {/* <input
                  name="yearExecution"
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Insert qurban event year execution here"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  value={values.yearExecution}
                /> */}
                <Select
                  id="sacrificialAnimalId"
                  name="sacrificialAnimalId"
                  onChange={(event) => {
                    const id = event.target.value
                    handleChange(event)
                    const selectedSacrificialAnimal = (sacrificialAnimalsData as SacrificialAnimalType[])
                      ?.find((item) => item.id === id) ?? null
                    setSelectedSacrificialAnimal(selectedSacrificialAnimal)
                  }}>
                  {sacrificialAnimalsData?.map((item, index) => (
                    <option defaultChecked={index === 0} selected={values.sacrificialAnimalId === item.id} value={item.id} key={`sacrificial-animal-item-${index}`} className="flex items-center gap-4">
                      {item.name}
                    </option>
                  )) ?? false}
                </Select>
              </div>
              {selectedSacrificialAnimal?.maximalUser
                && selectedSacrificialAnimal?.maximalUser > 0
                && Array.from({ length: selectedSacrificialAnimal?.maximalUser }, (_v, i) => i)
                .map((index) => (
                  <div key={`participant-id-${index}`} className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="participantIds">
                      {`Participant #${index + 1}`}
                    </label>
                    <div className="relative">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                      </div>
                      <input
                        id="participantIds"
                        name="participantIds"
                        type="text"
                        className="pl-10 p-2.5 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Select date"
                        disabled={isSubmitting}
                        onChange={handleChange} />
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