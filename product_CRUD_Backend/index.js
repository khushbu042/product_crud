const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/database/db.js");
const cors = require("cors")

//connect Database
connectDB();

const app = express();
//Build a server
const PORT=process.env.PORT;
app.listen(PORT, ()=>{
    console.log("server is running on port", PORT)
})

app.get('/', (req,res) => {
    res.send("Server is ruuning")
})

//some middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",  // frontend origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

    


//Routes Declaration
const userRoutes = require("./src/routes/user.routes.js");
const productRoutes = require("./src/routes/product.routes");


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);