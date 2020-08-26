import { gql } from "apollo-boost";

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

export { getBooksQuery, getAuthorsQuery };
