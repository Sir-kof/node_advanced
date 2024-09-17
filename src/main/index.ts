import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

import 'reflect-metadata'

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))

// import { app } from '@/main/config/app'
// import { env } from '@/main/config/env'

// import {AppDataSource} from '@/../ormconfig'

// AppDataSource.initialize()
  // .then(() => app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`)))
  // .catch(console.error)
