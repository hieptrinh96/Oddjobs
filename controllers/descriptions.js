import { Description } from "../models/description.js";

function index(req, res) {
  Description.find({})
    .then(descriptions => {
      res.render('descriptions/index', {
        descriptions,
        title: 'All Descriptions'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Description.create(req.body)
    .then(description => {
      res.redirect('/descriptions')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/descriptions')
    })
}

function newDescription(req, res) {
  res.render('descriptions/new', {
    title: 'Tell us about yourself!'
  })
}

function show(req, res) {
  Description.findById(req.params.id)
    .populate('owner')
    .then(description => {
      res.render('descriptions/show', {
        description,
        title: 'Shows Each Description'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/descriptions')
    })
}

function edit(req, res) {
  Description.findById(req.params.id)
    .then(description => {
      res.render('descriptions/edit', {
        description,
        title: 'Edit'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/descriptions')
    })
}

function update(req, res) {
  Description.findById(req.params.id)
    .then(description => {
      if (description.owner.equals(req.user.profile._id)) {
        description.updateOne(req.body)
          .then(updatedDescription => {
            res.redirect(`/descriptions/${description._id}`)
          })
      } else {
        throw new Error('Not Authorized')
      }
    })
    .catch(error => {
      console.log(error)
      res.redirect('/descriptions')
    })
}

function deleteDescription(req, res) {
  Description.findById(req.params.id)
    .then(description => {
      if (description.owner.equals(req.user.profile._id)) {
        description.delete()
          .then(deleteDescription => {
            res.redirect('/descriptions')
          })
      } else {
        throw new Error('Not Authorized')
      }
    })
    .catch(error => {
      console.log(error)
      res.redirect('/descriptions')
    })
}

export {
  index,
  create,
  newDescription as new,
  show,
  edit,
  update,
  deleteDescription as delete
}