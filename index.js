// IF YOU PULLED THIS CODE AND WANT TO RUN IT IN DEV MODE JUST COMMENT OUT THIS REQUIRE BELLLOW
// require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;

// connect to mongoDB with env variable
mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("All Fine - Mongoose Connected");
  }
});

app.use(bodyParser.json());
routes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listenig on port " + PORT);
});
