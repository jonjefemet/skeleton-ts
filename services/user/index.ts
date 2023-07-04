import express from "express";
import { loginRouter } from "./functions/login/index";

const app = express();

app.use( "/api/user", loginRouter );

export default app; 