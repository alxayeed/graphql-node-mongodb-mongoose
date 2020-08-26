import React from "react";
import BookList from "./components/Booklist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

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
      </div>
    </ApolloProvider>
  );
}

export default App;
