import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./db/dbconnect.js";



dotenv.config();
dbConnect();

const PORT = process.env.PORT || 4732;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API is running....");
});



