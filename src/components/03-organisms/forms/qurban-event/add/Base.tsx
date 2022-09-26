/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Formik, Form, FormikProps, FormikHelpers } from 'formik'
import { useRef, useContext } from 'react'
import { useContainerGet } from 'inversify-hooks-esm'
import { object, string, number } from 'yup'
import { useRouter } from 'next/router'
// @ts-ignore
// import { Datepicker } from 'flowbite-datepicker'

import { ContextPageQurbanEvents } from 'contexts'

import { addRefProps, PropsWithInnerRef } from "utils"
import {
  IControllerCoreHandleSubmit,
  CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
} from 'controllers'

import { IModelQurbanEventBase, IModelQurbanEventWithID } from "models"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentOrganismFormQurbanEventAddBaseProps
  extends PropsWithInnerRef<HTMLFormElement> {}

export const ComponentOrganismFormQurbanEventAddBase = <
  InputType extends IModelQurbanEventBase = IModelQurbanEventBase,
  PropType extends ComponentOrganismFormQurbanEventAddBaseProps = ComponentOrganismFormQurbanEventAddBaseProps,
  OutputType extends IModelQurbanEventWithID = IModelQurbanEventWithID
>({ innerRef }: PropType) => {
  const { toggleMode } = useContext(ContextPageQurbanEvents)
  const router = useRouter()
  const dateExecutionRef = useRef<HTMLInputElement>()

  const qurbanEventAddCtrl = useContainerGet<IControllerCoreHandleSubmit<InputType, OutputType>>(
      CONTROLLER_QURBAN_EVENT_ADMIN_ADD_HANDLE_SUBMIT_CLIENT
    )
  const initialValue: InputType = {
    yearExecution: (new Date()).getFullYear(),
    dateExecution: null,
    description: '',
  } as InputType

  const validationSchema = object({
    yearExecution: number().positive().integer().required().defined(),
    dateExecution: string().notRequired().nullable(),
    description: string().notRequired().nullable()
  })
    .required()
    .defined()

  const handleSubmit = async (input: InputType, helpers: FormikHelpers<InputType>) => {
    try {
      const result = await qurbanEventAddCtrl.handleSubmit(input, helpers)
      router.push(`/admin/mosques/${result.mosqueId}/events/${result.id}`)
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
      {({ isSubmitting, dirty, isValid, handleChange, values }: FormikProps<InputType>) => (
        <Form ref={innerRef} className="w-full lg:w-6/12 px-4">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
            <div className="flex-auto p-5 lg:p-10">
            <h4 className="text-2xl font-semibold">Add Qurban Event</h4>
            <div className="relative w-full mb-3 mt-8">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="yearExecution">
                Year Execution
              </label>
              <input
                name="yearExecution"
                type="number"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Insert qurban event year execution here"
                disabled={isSubmitting}
                onChange={handleChange}
                value={values.yearExecution}
              />
            </div>
            <div className="relative w-full mb-3 mt-8">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="dateExecution">
                Date Execution
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </div>
                <input
                  ref={dateExecutionRef}
                  name="dateExecution"
                  /** @ts-ignore */
                  datepicker
                  datepicker-buttons
                  type="text"
                  className="pl-10 p-2.5 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Select date"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  value={values.dateExecution} />
              </div>
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                cols={80}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                placeholder="Insert qurban event description here"
                disabled={isSubmitting}
                onChange={handleChange}
                value={values.description} />
              </div>
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
                  Register
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}  
    </Formik>
  )
}

export const ComponentOrganismFormQurbanEventAdd = addRefProps<HTMLFormElement>(
  ComponentOrganismFormQurbanEventAddBase
)