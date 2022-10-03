import { Router } from 'express'
import * as descriptionsCtrl from '../controllers/descriptions.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', descriptionsCtrl.index)
router.get('/new', descriptionsCtrl.new)
router.get('/:id', descriptionsCtrl.show)
router.get('/:id/edit', isLoggedIn, descriptionsCtrl.edit)

router.put('/:id', isLoggedIn, descriptionsCtrl.update)

router.post('/', descriptionsCtrl.create)
router.delete('/:id', isLoggedIn, descriptionsCtrl.delete)

export {
  router
}