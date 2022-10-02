import { Description } from '../models/description.js'

function create(req, res) {
  req.body.owner = req.user.profile._id
  Description.create(req.body)
    .then(description => {
      res.redirect('/profiles/show')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/profiles/show')
    })
}

function show(req, res) {
  Description.findById(req.params.id)
    .populate('owner')
    .then(description => {
      res.render('descriptions/show', {
        description,
        title: 'About me'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/descriptions/show')
    })
}

// function newDescription(req, res) {
//   res.render('profiles')
// }

export {
  create,
  // newDescription as new
}