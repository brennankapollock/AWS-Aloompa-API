const { ApolloServer, gql } = require("apollo-server-lambda");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

//spinning up a new instance of the Apollo Server and passing in the needed schema and resolvers for my graph.
const server = new ApolloServer({ typeDefs, resolvers });

//exporting the handler so serverless can have access to it.
module.exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
