import { Job } from '../models/job.js'
import { Profile } from '../models/profile.js'
import { Review } from '../models/review.js'

function index(req, res) {
  Profile.find({})
    .then(profiles => {
      res.render("profiles/index", {
        profiles,
        title: "Users"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function show(req, res) {
  Profile.findById(req.params.id)
    .populate('reviews')
    .populate('savedJobs')
    .then(profile => {
      const isSelf = profile._id.equals(req.user.profile._id)
      Job.find({ _id: { $nin: profile.savedJobs } }).then(job => {
        Review.find({ _id: { $nin: profile.reviews } })
          .then(review => {
            res.render('profiles/show', {
              title: 'About me',
              isSelf,
              profile,
              job,
              review
            })
          })
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/profiles')
    })
}


function edit(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      res.render('profiles/edit', {
        profile,
        title: 'Edit'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/profiles')
    })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(profile => {
      res.redirect(`/profiles/${profile._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function addToJobs(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      if (!profile.savedJobs.some(savedJob => {
        return savedJob?.equals(req.body.id)
      })) {
        profile.savedJobs.push(req.body.id)
      }
      profile.save()
        .then(() => {
          res.redirect(`/profiles/${profile._id}`)
        })
    })
}

function addToReviews(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      profile.reviews.push(req.body.id)
      profile.save()
        .then(() => {
          res.redirect(`profiles/${profile._id}`)
        })
    })
}

function deleteSavedJob(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      profile.savedJobs.remove(req.params.savedJobId)
      profile.save()
        .then(() => {
          res.redirect(`/profiles/${profile._id}`)
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/profiles/${profile._id}`)
    })
}

export {
  index,
  show,
  edit,
  update,
  addToJobs,
  addToReviews,
  deleteSavedJob
}