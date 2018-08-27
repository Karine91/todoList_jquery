const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

var todoRoutes = require("./routes/todos");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/views")));

app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("APP IS RUNNING ON PORT " + port);
});
