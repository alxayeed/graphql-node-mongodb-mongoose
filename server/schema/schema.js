const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = { graphql };

const BookType = GraphQLObjectType({
  name: "Book",
  fileds: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
