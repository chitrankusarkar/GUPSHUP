class ErrorHandler extends Error {
    constructor(msg, statusCode) {
        super(msg)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor) /* Without this unnecessary error reports would also be included */ 
    }
}

export const errorHandler = ErrorHandler