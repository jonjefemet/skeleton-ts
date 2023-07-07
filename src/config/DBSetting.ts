import dotenv from "dotenv";
dotenv.config();

const DBSetting = Object.freeze({
  credentialPostgreSql: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dbname: process.env.DB_NAME
  }
});

export default DBSetting;
