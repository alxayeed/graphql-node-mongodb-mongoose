const graphql = require("graphql");
const __ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

//Dummy Book
var books = [
  { title: "Pro Python", genre: "Learning", id: "1", authorid: "1" },
  { title: "Pro Django", genre: "Django", id: "4", authorid: "1" },
  {
    title: "Automate the Boring Stuff With Python",
    genre: "Education",
    id: "2",
    authorid: "3",
  },
  {
    title: "Coding with Minecraft",
    genre: "Education",
    id: "5",
    authorid: "3",
  },
  {
    title: "Learn Python The Hard Way",
    genre: "Learning",
    id: "3",
    authorid: "2",
  },
  {
    title: "The Command Line Crash Course",
    genre: "Learning",
    id: "6",
    authorid: "2",
  },
];

//Dummy Author
var authors = [
  { name: "Marty Alchin", age: 30, id: "1" },
  { name: "Zed A. Shaw", age: 33, id: "2" },
  { name: "Al Sweigart", age: 26, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return __.find(authors, { id: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return __.filter(books, { authorid: parent.id }); //--.filter(), not __.find()
      },
    },
  }),
});

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
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

//try the following query. It's Fun! an infinite loop!

// {
//   books{
//   	id
//     title
//     genre
//     author{
//       name
//       age
//       books{
//         title
//         author{
//           name
//           books{
//             title
//           }
//         }
//       }
//     }

//     }
// }
