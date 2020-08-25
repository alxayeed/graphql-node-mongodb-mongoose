const graphql = require("graphql");
const __ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

//Dummy data
var books = [
  { title: "Pro Python", genre: "Learning", id: "1" },
  {
    title: "Automate the Boring Stuff With Python",
    genre: "Education",
    id: "2",
  },
  { title: "LEarn Python THe Hard Way", genre: "Learning", id: "3" },
];

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data from db / other sources
        return __.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
