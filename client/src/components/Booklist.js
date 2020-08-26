import React from "react";
import { gql } from "apollo-boost"; //to make query
import { graphql } from "react-apollo"; //to bind the query with the component

//Making query
const getBooksQuery = gql`
  {
    books {
      title
      genre
    }
  }
`;

function BookList(props) {
  console.log(props);
  return (
    <div className="App">
      <ul id="book-list">
        <li>Book 1</li>
      </ul>
    </div>
  );
}

//binding the query with component while exporting
export default graphql(getBooksQuery)(BookList);
