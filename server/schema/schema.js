const graphql = require("graphql");
const __ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// //Dummy Book
// var books = [
//
//   {
//     title: "Learn Python The Hard Way",
//     genre: "Learning",
//     id: "3",
//     authorid: "2",
//   },
//   {
//     title: "The Command Line Crash Course",
//     genre: "Learning",
//     id: "6",
//     authorid: "2",
//   },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        // return __.find(authors, { id: parent.authorid });
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
        // return __.filter(books, { authorid: parent.id }); //--.filter(), not __.find()
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
        //return __.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return __.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        //return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent) {
        //return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorid: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          title: args.title,
          genre: args.genre,
          authorid: args.authorid,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
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
