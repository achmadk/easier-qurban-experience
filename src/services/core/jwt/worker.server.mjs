import { parentPort } from 'worker_threads'
import { expose } from 'comlink'
import nodeEndpoint from 'comlink/dist/esm/node-adapter.mjs'

import { jwtMethods } from './base.module.mjs'

expose(jwtMethods, nodeEndpoint(parentPort))