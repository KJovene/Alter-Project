import dotenv from "dotenv";

dotenv.config();

const ENV = {
    PORT: process.env.PORT || 4732,
    DB: process.env.DB,
    DB_NAME: process.env.DB_NAME
}

export default ENV; 