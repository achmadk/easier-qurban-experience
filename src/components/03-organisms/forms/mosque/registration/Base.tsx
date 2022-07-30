import { Formik, Form, FormikProps, FormikHelpers } from 'formik'
import { useMemo } from 'react'
import { container } from 'inversify-hooks-esm'
import { object, string } from 'yup'

import { IMosqueBase, IMosqueWithID } from "models"
import { addRefProps, PropsWithInnerRef } from "utils"
import {
  IControllerCoreHandleSubmit,
  CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT
} from 'controllers'

export interface ComponentOrganismFormMosqueRegistrationBaseProps<
  OutputType extends IMosqueWithID = IMosqueWithID
> extends PropsWithInnerRef {
  onAfterSubmit(value: OutputType): void
}

export const ComponentOrganismFormMosqueRegistrationBase = <
  InputType extends IMosqueBase = IMosqueBase,
  OutputType extends IMosqueWithID = IMosqueWithID,
  PropType extends ComponentOrganismFormMosqueRegistrationBaseProps<OutputType> = ComponentOrganismFormMosqueRegistrationBaseProps<OutputType>
>({ innerRef, onAfterSubmit }: PropType) => {
  const mosqueRegisterCtrl = useMemo(() =>
    container.get<IControllerCoreHandleSubmit<InputType, OutputType | null>>(
      CONTROLLER_MOSQUE_ADMIN_REGISTER_HANDLE_SUBMIT_CLIENT
    )
  , [])
  const initialValue: InputType = {
    name: '',
    address: ''
  } as InputType

  const validationSchema = object({
    name: string().required(),
    address: string().notRequired()
  })
    .required()
    .defined()

  const handleSubmit = async (input: InputType, options: FormikHelpers<InputType>) => {
    const output = await mosqueRegisterCtrl.handleSubmit(input, options)
    onAfterSubmit(output)
  }


  return (
    <div ref={innerRef} className="flex flex-wrap justify-center">
      <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ isSubmitting, dirty, isValid, handleChange }: FormikProps<InputType>) => (
          <Form className="w-full lg:w-6/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg">
              <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold">Mosque Registration</h4>
              <div className="relative w-full mb-3 mt-8">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="name">
                  Mosque Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Insert mosque name here"
                  disabled={isSubmitting}
                  onChange={handleChange}
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="address">
                  Mosque Address
                </label>
                <textarea
                  name="address"
                  rows={4}
                  cols={80}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Insert mosque address here"
                  disabled={isSubmitting}
                  onChange={handleChange} />
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blue-700 text-white active:bg-blue-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
    </div>
  )
}

export const ComponentOrganismFormMosqueRegistration = addRefProps(
  ComponentOrganismFormMosqueRegistrationBase
)