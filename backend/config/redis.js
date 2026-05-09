import { createClient } from "redis";


export let redisClient;

export const connectRedis = async()=>{
    
    const redisUrl = process.env.REDIS_URL;
    if(!redisUrl){
        console.log("Missing redis url");
        process.exit(1);
    }

    redisClient = createClient({
        url:redisUrl
    });

    redisClient.on("error", (err) => {
        console.error("Redis Client Runtime Error:", err.message);
    });
   
    // redisClient.connect()
    //     .then(()=>console.log("Connect to redis"))
    //     .catch(console.error);
    try {
        await redisClient.connect();
        console.log("Connect to redis");
    } catch (error) {
        console.error("Redis connection failed:", error);
    }


    
}