import { Job } from '../models/job.js'
import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
    .then(jobs => {
      res.render('jobs/index', {
        jobs,
        title: 'Fill out form to continue!'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
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
      res.redirect('/jobs')
    })
}

export {
  create,
  index
}