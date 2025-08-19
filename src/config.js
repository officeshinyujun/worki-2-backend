import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 2300,
};
