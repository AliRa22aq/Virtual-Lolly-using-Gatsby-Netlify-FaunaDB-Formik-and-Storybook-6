const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require('faunadb'),
  q = faunadb.query;
const shortid = require('shortid');

const typeDefs = gql`
  type Query {
    getVCard: [vCard]
  }
  type vCard {
    id: ID!
    c1: String!
    c2: String!
    c3: String!
    to: String!
    from: String!
    msg: String!
    link: String!
  }
  type Mutation {
    addVCard(c1: String!, c2: String!, c3: String!, to: String!, from: String!, msg: String!) : vCard
  }
`

const resolvers = {
  Query: {
    getVCard: () => {
      return [{}]
    }
  },
  Mutation: {
    addVCard: async (_, { c1, c2, c3, to, msg, from }) => {
      var adminClient = new faunadb.Client({ secret: 'fnAEAo3H5NACCMfVfQwTQTU6Eud19BijlajOv0XR' });

      console.log(c1, c2, c3, to, msg, from)
      const result = await adminClient.query(
        q.Create(
          q.Collection('vCards'),
          {
            data: {
              c1, c2, c3, to, msg, from,
              link: shortid.generate()
            }
          },
        )
      )
      return result.data.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()