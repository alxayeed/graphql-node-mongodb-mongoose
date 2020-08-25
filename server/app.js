const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;

const app = express();

// middleware
app.use("/graphql", graphqlHTTP({}));

app.listen(4000, () => {
  console.log(typeof graphqlHTTP);
});
