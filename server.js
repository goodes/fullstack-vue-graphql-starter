const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// import typedefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// import Environment
require('dotenv').config({ path: 'variables.env' });
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to mLab
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`DB connected`);
  })
  .catch(err => console.error(err));

const getUser = token => {
  if (token) {
    try {
      let user = jwt.verify(token, process.env.SECRET);
      console.log(user);
    } catch (err) {
      console.error(err);
      throw new AuthenticationError(
        'Your session has ended. Please sign in again'
      );
    }
  }
};
// Create Apollo/Graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    return { User, Post, currentUser: getUser(token) };
  },
  extensions: [() => new BasicLogging()]
});

class BasicLogging {
  requestDidStart({ queryString, parsedQuery, variables }) {
    console.log('request');
    // const query = queryString || print(parsedQuery);
    // console.log(query);
    // console.log(variables);
  }

  willSendResponse({ graphqlResponse }) {
    // console.log(JSON.stringify(graphqlResponse, null, 2));
  }
}

server.listen(4500).then(({ url }) => {
  console.log(`Server listening ${url}`);
});
