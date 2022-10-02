import { Router } from 'express'
import * as jobsCtrl from '../controllers/jobs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', jobsCtrl.index)
router.get('/new', isLoggedIn, jobsCtrl.new)
router.get('/:id', jobsCtrl.show)
router.get('/:id/edit', isLoggedIn, jobsCtrl.edit)

router.post('/', isLoggedIn, jobsCtrl.create)
export {
  router
}