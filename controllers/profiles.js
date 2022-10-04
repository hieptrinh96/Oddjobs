import { Job } from '../models/job.js'
import { Profile } from '../models/profile.js'
import { Review } from '../models/review.js'

function index(req, res) {
  Profile.find({})
    .then(profiles => {
      res.render("profiles/index", {
        profiles,
        title: "😻"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function show(req, res) {
  Profile.findById(req.params.id)
    .populate('jobs')
    .populate('reviews')
    .then(profile => {
      const isSelf = profile._id.equals(req.user.profile._id)
      Job.find({ _id: { $nin: profile.jobs } }).then(job => {
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
      // profile.updateOne(req.body)
      // .then(updatedProfile => {
      res.redirect(`/profiles/${profile._id}`)
      // })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}
// look through proile.jobs see if it alrdy have obj req.body.id
// if it does, do not push (not run code)
// if it doesnt, run
// to guard, set condition that if req,body.id matches, then 
// bang profile.job.some(job => {
// job._id.equals(req.body.id)
//}) callback to use .equals

function addToJobs(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      console.log('profile =', profile)
      if (!profile.jobs.some(job => {
        return job?.equals(req.body.id)
      })) {
        profile.jobs.push(req.body.id)
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

export {
  index,
  show,
  edit,
  update,
  addToJobs,
  addToReviews
}