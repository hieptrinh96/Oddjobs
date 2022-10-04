import { Job } from '../models/job.js'
import { Profile } from '../models/profile.js'

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
    .then(profile => {
      console.log('testing!!!!', profile)
      const isSelf = profile._id.equals(req.user.profile._id)
      Job.find({ _id: { $nin: profile.jobs } })
        .then(job => {
          res.render('profiles/show', {
            title: 'About me',
            isSelf,
            profile,
            job
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
      console.log('profile', profile)
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
  Profile.findById(req.params.id)
    .then(profile => {
      profile.updateOne(req.body)
        .then(updatedProfile => {
          res.redirect(`/profiles/${profile._id}`)
        })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function addToJobs(req, res) {
  console.log('what is this', req.params.id)
  Profile.findById(req.params.id)
    .then(profile => {
      profile.jobs.push(req.body.id)
      profile.save()
        .then(() => {
          res.redirect(`/profiles/${profile._id}`)
        })
    })
}


export {
  index,
  show,
  edit,
  update,
  addToJobs
}