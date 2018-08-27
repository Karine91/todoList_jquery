const mongoose = require("mongoose");
mongoose.set("debug", true);

const db = require("../config/keys").mongoURI;

mongoose.Promise = Promise;
//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongoose Connected"))
  .catch(err => console.log(err));

module.exports.Todo = require("./todos");
