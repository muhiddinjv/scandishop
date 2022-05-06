import { ApolloServer } from 'apollo-server';
import express from 'express';
import typeDefs from './schema';
import resolvers from './resolvers';
import path from 'path';
  
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
const app = express();

// server.applyMiddleware({
//     path: '/client',
//     app,
//   });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen({ port: 3000 }, () => {
    console.log(`🚀  App ready at http://localhost:3000`);
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});