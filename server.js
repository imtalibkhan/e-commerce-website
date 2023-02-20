import express  from "express"
import  colors  from "colors"

//need to create rest object for create rest api
const app = express()

//create rest api
app.get('/', (req,res) => {
    res.send("<h1>Welcome to e-commerce mern project application</h1>" )
})

//port

const PORT = 8080

// run listen
app.listen(PORT, ()=> {
    console.log(`server running on ${PORT}`.bgCyan.black);
});