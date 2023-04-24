import HttpStatusCode from "../enums/httpStatusCode";
import NAME_STATUS_CODE from "../enums/nameStatusCode";
import ErrorMiddleware from "./Error";

export class CustomError implements ErrorMiddleware {

    code: string;
    message: string;
    status: number;

    constructor(message: string, status = HttpStatusCode.INTERNAL_SERVER_ERROR, code = "") {
        this.status = status;
        this.code = NAME_STATUS_CODE[status] ?? code;
        this.message = message;
    }
    format(): { error: { code: string; message: string; }; } {
        return {
            error: {
                code: this.code,
                message: this.message
            }
        }
    }

}