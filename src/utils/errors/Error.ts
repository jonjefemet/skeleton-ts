export default interface ErrorMiddleware {
    code: string;
    message: string;
    status: number;
    format(): {
        error: {
            code: string,
            message: string
        }
    };
}