import express from "express";
import dotenv from "dotenv";

import conectToDatabase from "./src/database/mongoose.database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await conectToDatabase();

    app.get("/", (req, res) => {
      res.status(200).send("Hello World!");
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
