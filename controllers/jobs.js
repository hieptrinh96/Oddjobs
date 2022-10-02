import { Job } from '../models/job.js'

function index(req, res) {
  Job.find({})
    .then(jobs => {
      res.render('jobs/index', {
        jobs,
        title: 'Find a job you like?'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
}

function newJob(req, res) {
  res.render('jobs/new', {
    title: 'Post a job!'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Job.create(req.body)
    .then(job => {
      res.redirect('/jobs')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/jobs')
    })
}

function show(req, res) {
  Job.findById(req.params.id)
    .populate('owner')
    .then(job => {
      console.log(job)
      res.render('jobs/show', {
        job,
        title: 'Job Details'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/jobs')
    })
}

function edit(req, res) {
  Job.findById(req.params.id)
    .then(job => {
      res.render('jobs/edit', {
        job,
        title: 'Edit'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/jobs')
    })
}

function deleteJob(req, res) {
  Job.findById(req.params.id)
    .then(job => {
      if (job.owner.equals(req.user.profile._id)) {
        job.delete()
          .then(deletedJob => {
            res.redirect('/jobs')
          })
      } else {
        throw new Error('Not Authorized')
      }
    })
    .catch(error => {
      console.log(error)
      res.redirect('/jobs')
    })
}

function update(req, res) {
  Job.findById(req.params.id)
    .then(job => {
      if (job.owner.equals(req.user.profile._id)) {
        job.updateOne(req.body)
          .then(updatedJob => {
            res.redirect(`/jobs/${job._id}`)
          })
      } else {
        throw new Error('Not Authorized')
      }
    })
    .catch(error => {
      console.log(error)
      res.redirect('jobs')
    })
}

export {
  create,
  index,
  newJob as new,
  show,
  edit,
  deleteJob as delete,
  update
}