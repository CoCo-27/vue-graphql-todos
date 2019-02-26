import { mergeResolvers } from "merge-graphql-schemas";
import resolveUser from "./User";
import resolveTodo from "./Todo";

const resolvers = [resolveUser, resolveTodo];

export default mergeResolvers(resolvers);
