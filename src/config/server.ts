import dotenv from "dotenv";
dotenv.config();

export const config = Object.freeze({
  server: {
    port: process.env.PORT || 3000
  }
});