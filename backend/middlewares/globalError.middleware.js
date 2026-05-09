import { getErrorResponse } from "../utils/getResponse.js";

const globalErrorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode || 500).json(
    getErrorResponse({
        message:err.message,
        error:err,
        code:err.code,
    })
  );
};

export default globalErrorMiddleware;