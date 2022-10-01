import { Router } from 'express'
import * as jobsCtrl from '../controllers/jobs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, jobsCtrl.index)
router.get('/new', isLoggedIn, jobsCtrl.new)
router.get('/:id/show', jobsCtrl.show)

router.post('/', isLoggedIn, jobsCtrl.create)

export {
  router
}