import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as reviewsCtrl from '../controllers/reviews.js'

const router = Router()

router.get('/new/:profileId', isLoggedIn, reviewsCtrl.new)

router.post('/:profileId', isLoggedIn, reviewsCtrl.create)


export {
  router
}