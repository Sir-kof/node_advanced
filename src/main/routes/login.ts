import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeFacebookLoginController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/test', (req, res) => res.json({ data: {tipo: 'string', value: 'Rodrigo Fernandes'}}))
  router.post('/login/facebook', adapt(makeFacebookLoginController()))
}
