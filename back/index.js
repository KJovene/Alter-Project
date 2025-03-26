import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./db/dbconnect.js";
import router from "./routes/router.js";
import ENV from "./config/env.js";
import http from 'http';


dotenv.config();
dbConnect(ENV.DB, ENV.DB_NAME);
const httpServer = http.createServer();

httpServer.on('request', (res,req) => {
  res.setHeader('Acces-Control-Allow-Origin','*');
})

const app = express();
app.use(express.json());
app.use(cors());
app.use(router)

app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;

