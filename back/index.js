import express from "express";
import dbConnect from "./db/dbconnect.js";
import router from "./routes/router.js";
import ENV from "./config/env.js";
import cors from 'cors';

const app = express();
dbConnect(ENV.DB, ENV.DB_NAME);

app.use(express.json());
app.use(cors())
app.use(router)

export default app;

