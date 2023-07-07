import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { config } from "./config/server";
import cors from "cors";
import health from "../services/health/index";
import errorHandler from "./middleware/handleError";
import { CustomError } from "./utils/errors/CustomError";
import HttpStatusCode from "./utils/enums/httpStatusCode";
import user from "../services/user/index";
import swagger from "../services/swagger/index";
import dotenv from "dotenv";
dotenv.config();
class App {

  run() {
    const app = express();

    app.use( bodyParser.json());
    app.use( cors());
    app.use( health );
    app.use( user );
    app.use( swagger );
    app.use(( req: Request, res: Response ) => {
      throw new CustomError( "you're lost?", HttpStatusCode.NOT_FOUND );
    });
    app.use( errorHandler );

    const { port } = config.server;

    app.listen( port, () => {
      console.log( `[APP] - Starting application on port ${port}` );
    });
  }

}

const app = new App();

app.run();