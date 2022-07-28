import { expose } from 'comlink'
import { citizenXLSXMap } from 'models/user/citizen'
import readXLSXFile from 'read-excel-file/web-worker'

export interface IReadExcelFileWorkerType<ModelType = unknown> {
  getDataFromFile(input: File): Promise<ModelType | null>
}

async function getDataFromFile<ModelType = unknown>(input: File) {
  try {
    const { rows } = await readXLSXFile(input, {
      map: citizenXLSXMap
    })
    return rows as unknown as ModelType
  } catch {
    return null
  }
}

expose({ getDataFromFile })