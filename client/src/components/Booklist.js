import React, { Component } from "react";
import { graphql } from "react-apollo"; //to bind the query with the component
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  displayBooks() {
    var data = this.props.data;

    if (data.loading) {
      return <div>Loading Books.....</div>;
    } else {
      return data.books.map((books) => {
        return (
          <li
            key={books.id}
            onClick={(e) => {
              this.setState({
                selected: books.id,
              });
            }}
          >
            {books.title}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="App">
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookid={this.state.selected} />
      </div>
    );
  }
}

//binding the query with component while exporting
export default graphql(getBooksQuery)(BookList);
