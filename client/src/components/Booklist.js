import React, { Component } from "react";
import { gql } from "apollo-boost"; //to make query
import { graphql } from "react-apollo"; //to bind the query with the component

//Making query
const getBooksQuery = gql`
  {
    books {
      id
      title
      genre
    }
  }
`;

class BookList extends Component {
  displayBooks() {
    var data = this.props.data;

    if (data.loading) {
      return <div>Loading Books.....</div>;
    } else {
      return data.books.map((books) => {
        return <li key={books.id}>{books.title}</li>;
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <ul id="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

//binding the query with component while exporting
export default graphql(getBooksQuery)(BookList);
