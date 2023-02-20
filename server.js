import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan"
import connedDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"



//configure env
dotenv.config();

//database config
connedDB();

//need to create rest object for create rest api
const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'))

// all routes will be there 
app.use("/api/v1/auth", authRoute)





//create rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to e-commerce Mern project application</h1>");
});


//port
const PORT = process.env.PORT || 8080;


// run listen
app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgYellow.black);
});
