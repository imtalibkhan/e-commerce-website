import mongoose from "mongoose"
import colors from "colors"


const connedDB= async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodb database ${conn.connection.host}`.bgRed  .white)
        
    } catch (error) {
        console.log(`error in mongodb ${error}`.bgGreen.red)
        
    }
} 

export default connedDB