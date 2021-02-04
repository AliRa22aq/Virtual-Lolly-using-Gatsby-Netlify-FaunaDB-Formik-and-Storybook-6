const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;
const shortid = require('shortid');

const typeDefs = gql`
 
  type Mutation {
    addVCard(
      c1: String!, 
      c2: String!,
      c3: String!,
      to: String!,
      from: String!,
      msg: String!) : vCard
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
`;

const resolvers = {

  Mutation: {
    addVCard: async (_, { c1, c2, c3, rec, msg, sender }) => {
      var adminClient = new faunadb.Client({ secret: 'fnAEAo3H5NACCMfVfQwTQTU6Eud19BijlajOv0XR' });

      console.log(c1, c2, c3, rec, msg, sender)
      const result = await adminClient.query(
        q.Create(
          q.Collection('vCards'),
          {
            data: {
              c1, c2, c3, rec, msg, sender,
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