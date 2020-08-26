import React, { Component } from "react";
import { graphql } from "react-apollo"; //to bind the query with the component
import { getBookDetailsQuery } from "../queries/queries";

class BookDetails extends Component {
  displaybookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.title}</h2>
          <p>Genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          <i>
            <p>Other books by this author</p>
          </i>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.title}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  }
  render() {
    // console.log(this.props);

    return <div id="book-details">{this.displaybookDetails()}</div>;
  }
}

export default graphql(getBookDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookid,
      },
    };
  },
})(BookDetails);
