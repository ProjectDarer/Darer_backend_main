// models/Profile.js
const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },

  userName: String,
  bio: String,
  avatar: String,
  coverImage: String,
  location: String,
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
