import { parentPort } from 'worker_threads'
import { expose } from 'comlink'
import nodeEndpoint from 'comlink/dist/esm/node-adapter.mjs'

import { jwtMethods } from './base'

expose(jwtMethods, nodeEndpoint(parentPort))