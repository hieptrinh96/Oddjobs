import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  comment: String,
  rating: Number
})

const aboutMeSchema = new Schema({
  name: String,
  experience: String,
  location: String,
  preference: {
    type: String,
    enum: ['manual labor', 'teaching', 'cleaning', 'design']
  }
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  review: [reviewSchema],
  aboutMe: [aboutMeSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
