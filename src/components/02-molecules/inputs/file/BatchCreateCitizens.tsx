import { useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'
import { wrap } from 'comlink'
import { toast } from 'react-toastify'
import { uniqBy } from 'lodash-es'

import { ContextPageAdminCitizens } from 'contexts';

import { addRefProps, PropsWithInnerRef } from "utils";

import { IReadExcelFileWorkerType } from 'utils/integration/third-parties/read-excel-file/base.worker';
import { ICitizenBase } from 'models/user/citizen';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputFileBatchCreateCitizensBaseProps extends PropsWithInnerRef {}

const InputFileBatchCreateCitizensBase = <
  PropType extends InputFileBatchCreateCitizensBaseProps = InputFileBatchCreateCitizensBaseProps
>({ innerRef }: PropType) => {
  const { setAddedCitizens } = useContext(ContextPageAdminCitizens)
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const worker = new Worker(
      new URL('utils/integration/third-parties/read-excel-file/base.worker.ts', import.meta.url),
      { name: 'read-excel-file-worker' }
    )
    const app = wrap(worker) as unknown as IReadExcelFileWorkerType<ICitizenBase[]>
    try {
      const initialResult = await app.getDataFromFile(acceptedFiles[0])
      const citizens = initialResult?.map((item) => ({
        ...item,
        phoneNumber: item?.phoneNumber ? item.phoneNumber.toString() : null,
        name: item?.name ?? null
      })) ?? [] as ICitizenBase[]
      if (citizens.every((item) => item?.name && typeof name === 'string')) {
        setAddedCitizens((prevValue) => uniqBy([ ...prevValue, ...citizens], 'name'))
        toast.success(`Successfully read ${citizens.length} citizen data from file`)
      } else {
        toast.error('Please make sure that all citizen Full Name is filled')
      }
    } finally {
      worker.terminate()
    }
  }, [setAddedCitizens])

  const {
    isDragAccept,
    isDragReject,
    isDragActive,
    getRootProps,
    getInputProps
  } = useDropzone({
    noClick: true,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    onDrop
  })

  const borderClassName = clsx('flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none', {
    'border-gray-300 hover:border-gray-400': !isDragActive,
    'border-green-300 hover:border-green-400': isDragAccept,
    'border-red-300 hover:border-red-400': isDragReject,
  })
  const iconClassName = clsx('fas', {
    'fa-file-arrow-up': !isDragActive,
    'fa-badge-check text-green': isDragAccept,
    'fa-seal-exclamation': isDragReject
  })

  return (
    <div ref={innerRef} className="w-full px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <label {...getRootProps({ className: borderClassName })}>
        <span className="flex items-center justify-center space-x-2">
          <i className={iconClassName} style={{ width: '1rem' }} />
          <span className="font-medium">
            {!isDragActive && (
              <>
                {`Upload filled batch citizen file above to add citizens, or `}
                <span className="text-blue-600 underline">browse</span>
              </>
            )}
            {isDragAccept && 'This file is approved then process add citizens' }
            {isDragReject && 'Sorry, this file is rejected' }
          </span>
        </span>
        <input {...getInputProps({ className: 'hidden' })} />
      </label>
      </div>

    </div>
  )
}

export const InputFileBatchCreateCitizens = addRefProps(
  InputFileBatchCreateCitizensBase
)
