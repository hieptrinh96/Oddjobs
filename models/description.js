import mongoose, { Schema } from 'mongoose'

const descriptionSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'Profiles' },
  name: String,
  skill: String,
  location: String,
}, {
  timestamps: true
})

const Description = mongoose.model('Description', descriptionSchema)

export {
  Description
}