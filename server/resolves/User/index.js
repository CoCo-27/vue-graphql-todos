import User from "../../models/User";
import Todo from "../../models/Todo";

export default {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec(async (err, res) => {
          if (err) {
            reject(err);
          } else {
            const data = res;
            resolve(data);
          }
        });
      });
    },
    users: (root, args) => {
      return new Promise((resolve, reject) => {
        User.find(args)
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  User: {
    todos: (root, args) => {
      return new Promise((resolve, reject) => {
        Todo.find(Object.assign({ owner: root.id }, args))
          .populate()
          .exec((err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
      });
    },
    partners: root => {
      // console.log(root.name, "partners");
      if (!root.partners.length) {
        return Promise.resolve(null);
      }
      return Promise.all(
        root.partners.map(id => {
          return new Promise((resolve, reject) => {
            User.findOne({ id }).exec((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          });
        })
      );
    }
  },
  Mutation: {
    addUser: (root, { id, name, gender, email }) => {
      const newUser = new User({ id, name, gender, email });
      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    addPartners: (root, { id, partnerIds }) => {
      let user;
      return new Promise((resolve, reject) => {
        User.findOne({ id }).exec((err, res) => {
          if (err) {
            reject(err);
          } else {
            user = res;
            console.log(user, "找到的user");
            console.log([...user.partners, ...partnerIds], "friends");
            User.updateOne(
              { id },
              {
                $set: {
                  partners: [...new Set([...user.partners, ...partnerIds])]
                }
              }
            ).exec(err => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          }
        });
      });
    },
    editUser: (root, { id, name, gender, todos, partners, email }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
          { id },
          { $set: { name, gender, todos, partners, email } }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
