import express from "express";
import { loginRouter } from "./functions/login/index";
import { addUser } from "./functions/addUser/index";

const app = express();

app.use( "/api/user", loginRouter, addUser );

export default app; 