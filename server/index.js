import express from "express";
import { ApolloServer } from "apollo-server-express";
import opn from "opn";
// import User from "../../models/User";
// import Todo from "../../models/Todo";
import mongoose from "mongoose";
import typeDefs from "./types";
import resolvers from "./resolves";
import DataLoader from "dataloader";

const PORT = 4002;

const db = "mongodb://Holybasil:holy1128@ds147073.mlab.com:47073/holytodos";

// Connect to MongoDB with Mongoose.
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true
  // context: async () => {
  //   return {
  //     User,
  //     dataloaders: {
  //       partners: new DataLoader(async arg => {
  //         return arg.map(async id => {
  //           return await User.findOne(id);
  //         });
  //       })
  //     }
  //   };
  // }
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  const url = `http://localhost:${PORT}${server.graphqlPath}`;
  console.log(`🚀 Server ready at ${url}`);
  opn(url);
});
