const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');
const resolvers = require('./resolvers')
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const url = "mongodb://127.0.0.1:27017/shorewikidb"; 
const startServer = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected correctly to MongoDB server!');

    const server = new ApolloServer({
      typeDefs: schema.typeDefs,
      resolvers: resolvers.resolvers
    });
    const app = express();
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    );
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

startServer()


