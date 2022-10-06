import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.get('/:id/edit', profilesCtrl.edit)

router.post('/:id/jobs', profilesCtrl.addToJobs)
router.post('/:id/reviews', isLoggedIn, profilesCtrl.addToReviews)

router.put('/:id', isLoggedIn, profilesCtrl.update)

router.delete('/:id/savedJobs/:savedJobId', isLoggedIn, profilesCtrl.deleteSavedJob)



export {
  router
}