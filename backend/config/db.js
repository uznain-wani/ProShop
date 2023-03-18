 // WE JUST CONNECT MONGODB  IN THIS File
 
import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URI)

       console.log(`MongoDb Connected: ${conn.connection.host}`)  //will show host here which is 127.0.0.1
    // console.log('mongodb connected successfully');           //u can simply write this also

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
export default connectDB