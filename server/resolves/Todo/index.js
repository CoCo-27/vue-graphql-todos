import Todo from "../../models/Todo";
import User from "../../models/User";

export default {
  Query: {
    todo: (root, args) => {
      return new Promise((resolve, reject) => {
        Todo.findOne(args).exec((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    },

    todos: (root, args) => {
      return new Promise((resolve, reject) => {
        Todo.find(args)
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Todo: {
    owner: root => {
      return new Promise((resolve, reject) => {
        User.findOne({ id: root.owner }).exec((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }
  },
  Mutation: {
    addTodo: (root, { todo }) => {
      console.log(todo, "参数");
      const newTodo = new Todo(todo);
      return new Promise((resolve, reject) => {
        newTodo.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editTodo: (root, { id, owner, content, type }) => {
      return new Promise((resolve, reject) => {
        Todo.findOneAndUpdate({ id }, { $set: { owner, content, type } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteTodo: (root, args) => {
      return new Promise((resolve, reject) => {
        Todo.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
