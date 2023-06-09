require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts.js");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

app.use("/api/workouts", workoutRoutes);

// connect to db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT + ".");
    });
  })
  .catch((error) => {
    console.log(error);
  });
