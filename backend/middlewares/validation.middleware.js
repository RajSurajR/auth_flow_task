import sanitize from "mongo-sanitize";
import { emailSchema, loginSchema, registerSchema, todoSchema } from "../config/zod.js";


export const validateSignup = (req, res, next) => {
  const sanitizedBody = sanitize(req.body);
  const validation = registerSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      message: errors[0]?.message || "Validation failed",
      errors,
    });
  }

  req.body = validation.data;
  next();
};

export const validateLogin = (req, res, next) => {
   const sanitizedBody = sanitize(req.body);
  const validation = loginSchema.safeParse(sanitizedBody);
  
  if (!validation.success) {
    const errors = validation.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      message: errors[0]?.message || "Validation failed",
      errors,
    });
  }
  // console.log(validation.data);
  req.body = validation.data;
  next();
};

export const validateTodo = (req, res, next) => {
  const sanitizedBody = sanitize(req.body);

  const validation = todoSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      message: errors[0]?.message || "Validation failed",
      errors,
    });
  }

  req.body = validation.data;
  next();
};
