import { Router } from 'express'
import * as descriptionsCtrl from '../controllers/descriptions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// router.get('/new', isLoggedIn, descriptionsCtrl.new)

router.get('/:id', descriptionsCtrl.show)

router.post('/', isLoggedIn, descriptionsCtrl.create)

export {
  router
}