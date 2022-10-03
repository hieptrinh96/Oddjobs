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
    .then(profile => {
      const isSelf = profile._id.equals(req.user.profile._id)
      res.render('profiles/show', {
        title: 'About me',
        isSelf,
        profile,
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

function createAboutMe(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      profile.aboutMe.push(req.body)
      profile.save()
        .then(() => {
          res.redirect(`/profiles/${req.user.profile._id}`)
        })
        .catch(error => {
          console.log(error)
          res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
    .catch(error => {
      console.log(error)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function updateAboutMe(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {

    })
}

// function newProfile(req, res) {
//   res.render('profiles/new', {
//     title: 'Tell us about yourself!'
//   })
// }

export {
  index,
  show,
  // newProfile as new,
  edit,
  createAboutMe,
  updateAboutMe
}