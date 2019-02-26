import mongoose from "mongoose";

const Schema = mongoose.Schema;
let i = 5;
// Create the User Schema.
const UserSchema = new Schema({
  id: {
    type: String,
    default: () => {
      i += 1;
      return i;
    },
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  gender: Number, // 0=女 1=男
  partners: {
    type: [String],
    default: []
  },
  email: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
