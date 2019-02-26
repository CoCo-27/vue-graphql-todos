import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Todo from "./Todo";

const typeDefs = [User, Todo];

export default mergeTypes(typeDefs, { all: true });
