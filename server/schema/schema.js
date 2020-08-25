const graphql = require("graphql");
const __ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

//Dummy Book
var books = [
  { title: "Pro Python", genre: "Learning", id: "1" },
  {
    title: "Automate the Boring Stuff With Python",
    genre: "Education",
    id: "2",
  },
  { title: "LEarn Python THe Hard Way", genre: "Learning", id: "3" },
];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//Dummy Author
var authors = [
  { name: "Marty Alchin", age: 30, id: "1" },
  { name: "Zed A. Shaw", age: 33, id: "2" },
];

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other sources
        return __.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return __.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
