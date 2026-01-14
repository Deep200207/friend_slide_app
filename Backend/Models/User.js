import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },      // fixed required
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } ,  // use String instead of Number
  pic:{ type :String,
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
});

// Explicitly use "users" collection
const User = mongoose.model("User", userSchema);

export default User;
