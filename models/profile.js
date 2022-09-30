import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  comment: String,
  rating: Number
})


const profileSchema = new Schema({
  name: String,
  avatar: String,
  review: [reviewSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
