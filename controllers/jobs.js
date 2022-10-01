import { Job } from '../models/job.js'
import { Profile } from '../models/profile.js'

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
  req.body.owner = req.user.profile_id
  res.render('jobs/new', {
    title: 'Post a job!'
  })
    .catch(error => {
      console.log(error)
      res.redirect('/job')
    })
}

function create(req, res) {
  req.body.owner = req.user.profile_id
  Job.create(req.body)
    .then(job => {
      res.redirect('/jobs')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/jobs/new')
    })
}

function show(req, res) {
  Job.findById(req.params.id)
    .populate('owner')
    .then(job => {
      res.render('jobs/show', {
        job,
        title: 'Job Details'
      })
    })
}

export {
  create,
  index,
  newJob as new,
  show
}