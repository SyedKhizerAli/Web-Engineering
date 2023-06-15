require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
// const connection = require("./db");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const playListRoutes = require("./routes/playLists");
const searchRoutes = require("./routes/search");

const app = express();
app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
    const connectionString = 'mongodb+srv://khizer:x3hXnCyNcd78QAar@cluster0.duvzm95.mongodb.net/?retryWrites=true&w=majority';
  
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  // Call the async function to connect to MongoDB
  connectToMongoDB();
// app.use(cors());
// app.use(express.json());

app.use("/api/users/", userRoutes);
app.use("/api/login/", authRoutes);
app.use("/api/songs/", songRoutes);
app.use("/api/playlists/", playListRoutes);
app.use("/api/", searchRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
