const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();
router.get("/",(req,res)=>{
  res.status(200).json({
    "success": true,
    "data":users
  })
})

router.get("/:id",(req,res)=>{
  const {id} = req.params
  const user = users.find(each=>each.id===id)
  if(!user){
    return res.status(404).json({
      "success":false,
      "message":"User not Found!!!"
    })
  }
  res.status(200).json({
    "success": true,
    "data":user
  })
})

router.post("/",(req,res)=>{
  const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
  console.log(req.body)
  if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
    return res.status(400).json({
      "success":false,
      "message":"Please provide all required fields"
    })
  }
  const user = users.find(each=>each.id===id)
  if(user){
    return res.status(409).json({
      "success":false,
      "message":`User with id ${id} already exists`
    })
  }
  users.push({id,name,surname,email,subscriptionType,subscriptionDate})
  res.status(201).json({
    "success":true,
    "message":"User added successfully"
  })
})
router.put("/:id",(req,res)=>{
  const {id} = req.params;
  const data = req.body;
  console.log(data)
  const ind = users.findIndex((each)=>each.id===id)
  if(ind===-1){
    return res.status(404).json({
      "success" : false,
      "message" : `User not present with ${id}`
    })
  }
  const updatedUser = {...users[ind],...data}
  users[ind] = updatedUser;
  res.status(200).json({
    "success":true,
    "message" : "User details updated successfully",
    "data": updatedUser
  })
})
router.delete("/:id",(req,res)=>{
  const {id} = req.params
  const ind = users.findIndex((each)=>each.id===id)
  if(ind===-1){
    return res.status(404).json({
      "success" : false,
      "message" : `User not present with ${id}`
    })
  }
  users.splice(ind,1)
  res.status(200).json({
    "success":true,
    "message" : "User deleted successfully"
  })
})
module.exports = router;