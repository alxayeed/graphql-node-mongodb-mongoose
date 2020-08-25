const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const mongoose = require("mongoose", { useUnifiedTopology: true });
const dotenv = require("dotenv");

const app = express();

// middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening to port 4000 for connections");
});

//connect to mongodb Atlas database

dotenv.config();

const mongoAtlasString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zjljy.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose.connect(mongoAtlasString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (error) {
  console.log(error);
});

mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB Atlas");
});
