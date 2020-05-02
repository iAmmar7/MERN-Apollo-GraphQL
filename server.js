const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const db = require("./config/keys.js").mongoURI;

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV !== "production",
});

server.applyMiddleware({ app, cors: false });

app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
);
