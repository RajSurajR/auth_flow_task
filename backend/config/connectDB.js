import mongoose from "mongoose";

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            dbName:"MERNAuthentication",
        });

        console.log("Mongo DB connected");
    }catch(error){
        console.log("Failed to connect DB : ", error.message);
    }
}
export default connectDb;