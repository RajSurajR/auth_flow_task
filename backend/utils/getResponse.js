export const getSuccessResponse = ({message = "Operation successful", data = null, meta = null}) => {
    return{
        success: true,
        message:message,
        data:data,
        meta:meta,
        error:null,
    }
}

export const getErrorResponse = ({message = "An unexpected error occurred", error, code="INTERNAL_SERVER_ERROR", logError=false}) =>{
    // show technical details if we are in Dev mode
    const isDev = process.env.NODE_ENV === "development";
    // if (logError || (error && !error.statusCode) || (error && error.statusCode >= 500)) {
    if (logError || (error && error.statusCode >= 500)) {
        console.error(`[ERROR]: ${code} | Message: ${message}`, error);
    }
    
    return {
        success: false,
        message, 
        data:null,
        error: isDev ? {
            message: error?.message || "No error message provided", 
            stack: error?.stack,
            code: error?.code || code
        }
        : { code } 
    }
}

