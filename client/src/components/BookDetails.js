import React, { Component } from "react";
import { graphql } from "react-apollo"; //to bind the query with the component
import { getBookDetailsQuery } from "../queries/queries";

class BookDetails extends Component {
  render() {
    return (
      <div id="book-details">
        <p>Book Details</p>
      </div>
    );
  }
}

export default graphql(getBookDetailsQuery)(BookDetails);
