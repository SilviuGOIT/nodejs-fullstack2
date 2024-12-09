const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000;
const db_url = process.env.DB_URL;

// functie prin care ne conectam la baza de date

const connectMongoDb = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("MongoDB connection successfully");
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
  }
};
connectMongoDb();

//https://www.mongodb.com/resources/compare/relational-vs-non-relational-databases
//https://www.datastax.com/guides/nosql-use-cases#1-e-commerce-applications

//Documentatie Mongoose
//https://mongoosejs.com/docs/index.html
