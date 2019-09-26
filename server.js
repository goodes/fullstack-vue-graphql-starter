const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

// Create Apollo/Graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
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
