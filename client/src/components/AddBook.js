import React, { Component } from "react";
import { gql } from "apollo-boost"; //to make query
import { graphql } from "react-apollo"; //to bind the query with the component
import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component {
  displayAuthor() {
    var data = this.props.data;
    if (data.loading) {
      return <option>Loading Authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
    console.log(data);
  }
  render() {
    return (
      <form id="add-book">
        <div className="fied">
          <label>Book Name:</label>
          <input type="text" />
        </div>

        <div className="fied">
          <label>Genre:</label>
          <input type="text" />
        </div>

        <div className="fied">
          <label>Author:</label>
          <select>
            <option> Select Author</option>
            {this.displayAuthor()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
