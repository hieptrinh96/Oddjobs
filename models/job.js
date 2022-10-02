import mongoose from 'mongoose'

const Schema = mongoose.Schema

const jobSchema = new Schema({
  name: String,
  classify: String,
  location: String,
  detail: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true
})

const Job = mongoose.model('Job', jobSchema)

export {
  Job
}