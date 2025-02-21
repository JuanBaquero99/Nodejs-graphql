const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { get } = require('../routes/products.router');

const typeDefs = `
  type Query {
    hello: String!
    getPerson(name: String, age: Int): String
    getInt: Int
    getFloat: Float
    getBoolean: Boolean
    getID: ID
    getString: String
    getNumbers(numbers: [Int!]!): [Int]
    getProducts: Product
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    image: String!
    createdAt: String!
    }
`;

//Creamos un tipado como Product, que tiene un id, name, price, image y createdAt el cual en getProducts lo retornamos para su validación.

const resolvers = {
  Query: {
    hello: () => 'hola mundo',
    getPerson: (_, args) => `Hola soy ${args.name}, y tengo ${args.age} años`,
    getInt: () => 10,
    getFloat: () => 10.5,
    getBoolean: () => true,
    getID:
    () => '1234',
    getString: () => 'Hola mundo',
    getNumbers: (_, args) => args.numbers,
    getProducts: () => {
      return {
        id: '1',
        name: 'Producto 1',
        price: 1000.0,
        description: 'Esta es la descripción del producto',
        image: 'https://placeimg.com/640/480/tech',
        createdAt: new Date().toISOString()
      }
    }
  }
};

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });

  await server.start();
  server.applyMiddleware({ app });
};

module.exports = useGraphql;
