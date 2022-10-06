import { Review } from '../models/review.js'
import { Profile } from '../models/profile.js'

function create(req, res) {
  req.body.owner = req.user.profile._id
  Review.create(req.body)
    .then(review => {
      Profile.updateOne(
        { _id: req.params.profileId },
        { $push: { reviews: review } }
      ).then(() => {
        res.redirect(`/profiles/${req.params.profileId}`)
      })
    })
    .catch(error => {
      res.redirect('/')
    })
}

function newReview(req, res) {
  res.render('reviews/new', {
    title: 'Add a review for the user!',
    profileId: req.params.profileId
  })
}



export {
  create,
  newReview as new,

}