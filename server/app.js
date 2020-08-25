const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

const app = express();

// middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
  })
);

app.listen(4000, () => {
  console.log(typeof graphqlHTTP);
});
