import mongoose from 'mongoose'

const Schema = mongoose.Schema

const descriptionSchema = new Schema({
  name: String,
  skill: String,
  location: String,
  detail: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const Description = mongoose.model('Description', descriptionSchema)

export {
  Description
}