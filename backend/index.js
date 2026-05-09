import "./config/env.js"; 

const PORT = process.env.PORT;

import connectDB from "./config/connectDB.js";
import app from "./app.js";
import { connectRedis } from "./config/redis.js";

connectDB().then(() => {
    connectRedis().then(() => {
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
    }).catch((err) => {
        console.error("Failed to connect to Redis:", err);
        process.exit(1);
    }); 
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
}); 
