import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan"
import connedDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import  path from "path";
import {fileURLToPath} from "url";



//configure env
dotenv.config();

//database config
connedDB();
//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

//need to create rest object for create rest api
const app = express();



//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))


// all routes will be there 
app.use("/api/v1/auth", authRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/products', productRoutes)



//create rest api

app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'.client/build/index.html'))

})
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to e-commerce Mern project application</h1>");
// });
//port
const PORT = process.env.PORT || 8080;
// run listen
app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgYellow.black);
});
