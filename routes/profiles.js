import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
// router.get('/new', isLoggedIn, profilesCtrl.new)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.get('/:id/edit', profilesCtrl.edit)

router.post('/:id/jobs', profilesCtrl.addToJobs)

router.put('/:id', isLoggedIn, profilesCtrl.update)
//should change id to profileId
// add aboutme id
// router.put('/:profileId/aboutMe/:aboutMeId', isLoggedIn, profilesCtrl.updateAboutMe)

// router.post('/:id/aboutMe', profilesCtrl.createAboutMe)

export {
  router
}