import mongoose from 'mongoose'

const Schema = mongoose.Schema

const jobSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  classify: String,
  location: String,
  detail: String,
  name: String
}, {
  timestamps: true
})

const Job = mongoose.model('Job', jobSchema)

export {
  Job
}