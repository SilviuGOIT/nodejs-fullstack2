const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

dotenv.config();

const routerApi = require("./routes/index");
const coreOptions = require("./cors");

app.use(express.json());
app.use(cors(coreOptions));
app.use(morgan("tiny"));

app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    data: "not found",
  });
});

const port = process.env.PORT || 5000;
const db_url = process.env.DB_URL;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("MongoDB connection successfully");
    app.listen(port, () => {
      console.log(`Our Server is listing the ${port} Port`);
    });
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
  }
};
connectMongoDb();

//https://www.mongodb.com/resources/compare/relational-vs-non-relational-databases
//https://www.datastax.com/guides/nosql-use-cases#1-e-commerce-applications

//Documentatie Mongoose
//https://mongoosejs.com/docs/index.html
