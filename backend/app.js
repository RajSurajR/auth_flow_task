import express from 'express';
import cors from 'cors';
import globalErrorMiddleware from './middlewares/globalError.middleware.js';
import cookieParser from 'cookie-parser';
import { allRoutes } from './routes/index.route.js';

const app = express();


// enable cors
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET", "POST", "PATCH", "DELETE"],
}));

// parses JSON data from incoming requests.
app.use(express.json({limit:"10kb"}));
app.use(cookieParser()); 

//Parses form data (URL-encoded data)
app.use(express.urlencoded({ extended: true })); 

allRoutes(app);

app.use(globalErrorMiddleware);


export default app;