// models/Profile.js
import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",        // reference to User model
    required: true,
    index: true
  },
  userName: String,
  bio: String,
  profilePicture: String,
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  email:{type:String,required:true,unique:true},
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
