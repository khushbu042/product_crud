const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI
const connectDB = async() => {
    try{
        const connectedDB  = await mongoose.connect(
            DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log("MongoDB Connected");
    }catch(error){
        console.log("MongoDb Error: ", error);
    }
}

module.exports = connectDB