import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BookList from "./components/Booklist";
import AddBook from "./components/AddBook";

//setup apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>BookList</h1>
        </header>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
