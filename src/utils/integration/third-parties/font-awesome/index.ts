import { library, dom /* , config */ } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'

// config.autoAddCss = false

import { fab } from '@fortawesome/free-brands-svg-icons' // Requires @fortawesome/free-brands-svg-icons
import { far } from '@fortawesome/free-regular-svg-icons' // Requires @fortawesome/free-regular-svg-icons
import { fas } from '@fortawesome/free-solid-svg-icons' // Requires @fortawesome/free-solid-svg-icons

library.add(fab, far, fas)

dom.watch()