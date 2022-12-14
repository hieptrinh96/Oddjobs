import mongoose from "mongoose"

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  location: String,
  experience: String,
  preference: {
    type: String,
    enum: ['manual labor', 'teaching', 'design', 'cleaning']
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],

  savedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
