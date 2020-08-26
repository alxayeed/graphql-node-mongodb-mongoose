import { gql } from "apollo-boost"; //to make query

//Making query to get all books
const getBooksQuery = gql`
  {
    books {
      id
      title
      genre
    }
  }
`;

//Making query get all authors
const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

//making queries to add books
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(title: $name, genre: $genre, authorid: $authorid) {
      title
      genre
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };