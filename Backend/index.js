require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require('body-parser')
const {registrationMODLE} = require("./RegistrationModel.js")

const app = express();
const PORT = 8080;

app.use(express.json())


app.listen(PORT, () => {
  console.log(`server Running on ${PORT}`);
  connectDB()
});

const connectDB = async()=> {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected")
  } catch (error) {
    console.log("Failed to Connect to the DB , ", error)
  }
}