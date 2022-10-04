import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  comment: String,
  rating: { type: Number,
  min: 1,
  max: 5},
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}