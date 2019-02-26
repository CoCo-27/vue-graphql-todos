import express from "express";
import { ApolloServer } from "apollo-server-express";
import opn from "opn";
import mongoose from "mongoose";
import typeDefs from "./types";
import resolvers from "./resolves";

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

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  const url = `http://localhost:${PORT}${server.graphqlPath}`;
  console.log(`🚀 Server ready at ${url}`);
  opn(url);
});
