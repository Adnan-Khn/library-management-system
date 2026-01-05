const express = require("express")

const app = express();
const PORT = 3000;

app.get("/",(req,res)=>{
  res.status(200).send({
    message: "Library Management System API is running"
  })
})

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})