import { Router } from 'express'
import * as jobsCtrl from '../controllers/jobs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, jobsCtrl.index)

router.post('/', isLoggedIn, jobsCtrl.create)

export {
  router
}