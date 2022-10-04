import { Review } from '../models/review.js'
import { Profile } from '../models/profile.js'


function create(req, res) {
  req.body.owner = req.user.profile._id
  Review.create(req.body)
    .then(review => {
      res.redirect('/reviews/new')
    })
    .catch(error => {
      res.redirect('/reviews/new')
    })
}

function newReview(req, res) {
  Review.find(req.params.id)
    .then(review => {
      res.render('reviews/new', {
        title: 'Add a review for the user!',
        review
      })
    })
}

export {
  create,
  newReview as new
}