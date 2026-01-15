const express = require("express")
require("dotenv").config();
const {users} = require("./data/users.json")

const userRoutes = require("./routes/users")
const bookRoutes = require("./routes/books")

const dbConnection = require("./dbConnection")
dbConnection();

const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.get("/",(req,res)=>{
  res.status(200).send({
    message: "Library Management System API is running"
  })
})

app.use("/users",userRoutes)
app.use("/books",bookRoutes)

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})