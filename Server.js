const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const { sendMail } = require("./global/sendMail");

const Route = require("./routes");
const { aunthenticate } = require("./middleware/authenticate");

app.get("/health", (req, res) => {
  res.status(200).send("Server is up and running!");
});

app.post("/sendmail", sendMail);
Route.forEach((route) => {
  const { path, method, callback, authenticate = true } = route;
  let middleware = [];
  if (authenticate) {
    middleware = [aunthenticate];
  }

  app[method](path, [...middleware], callback);
});

let port = process.env.PORT || 5010;

app.listen(port, () => {
  console.log(`Connected to server at port ${port}`);

  mongoose.connect(
    "mongodb://localhost:27017/keeper",
    () => {
      try {
        console.log("Connected to the database keeper");
      } catch (err) {
        console.log("Something went wrong", err);
      }
    },
    (e) => {
      console.log("Something went wrong", e);
    }
  );
});
