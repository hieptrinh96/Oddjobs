import { Router } from 'express'
import * as descriptionsCtrl from '../controllers/descriptions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/new', descriptionsCtrl.new)

export {
  router
}