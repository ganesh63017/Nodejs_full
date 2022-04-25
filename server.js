const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MongoDb } = require("./config"); // getting DataBase Url
const bodyParser = require("body-parser");
const cors = require('cors')

const userRoutes = require("./Routes/user"); // Routing Purpose Of URL
const notesRoute = require("./Routes/notes");
const auth = require("./Middleware/auth");
app.use(cors())
app.use(bodyParser.json()); // Parsing the Data Comes from Request else It shows Undefined Data

app.use("/api/protected", auth, (req, res) => {
  res.end(`Hi ${req.body.firstName}, you are authenticated`);
});

app.use("/api/userData", userRoutes);
app.use("/api/notes", auth, notesRoute);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

mongoose
  .connect(MongoDb, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is Connected Successfully");
    return app.listen(3300);
  })
  .then(() => console.log("Successfully Running Port 3300"))
  .catch((e) =>
    console.log("Error Raised In Connection OR Running", e.message)
  );
