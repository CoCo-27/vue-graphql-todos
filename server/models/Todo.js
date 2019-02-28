import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Create the User Schema.
let i = 9;
const todoSchema = new Schema({
  id: {
    type: String,
    default: () => {
      i += 1;
      return i;
    },
    unique: true
  },
  owner: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createTime: {
    type: String,
    default: () => {
      return new Date().getTime();
    }
  },
  type: {
    type: String,
    default: "normal"
  }
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
