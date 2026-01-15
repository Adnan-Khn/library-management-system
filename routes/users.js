const express = require("express");
const {users} = require("../data/users.json");

const controllers = require("../controllers/users-controllers")
console.log(controllers)
const {getAllUsers,getUserById,postUser,updateUser,deleteUser} = controllers

const router = express.Router();
// router.get("/",(req,res)=>{
//   res.status(200).json({
//     "success": true,
//     "data":users
//   })
// })
router.get("/",getAllUsers)

// router.get("/:id",(req,res)=>{
//   const {id} = req.params
//   const user = users.find(each=>each.id===id)
//   if(!user){
//     return res.status(404).json({
//       "success":false,
//       "message":"User not Found!!!"
//     })
//   }
//   res.status(200).json({
//     "success": true,
//     "data":user
//   })
// })
router.get("/:id",getUserById)

// router.post("/",(req,res)=>{
//   const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
//   console.log(req.body)
//   if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//     return res.status(400).json({
//       "success":false,
//       "message":"Please provide all required fields"
//     })
//   }
//   const user = users.find(each=>each.id===id)
//   if(user){
//     return res.status(409).json({
//       "success":false,
//       "message":`User with id ${id} already exists`
//     })
//   }
//   users.push({id,name,surname,email,subscriptionType,subscriptionDate})
//   res.status(201).json({
//     "success":true,
//     "message":"User added successfully"
//   })
// })
router.post("/",postUser)

// router.put("/:id",(req,res)=>{
//   const {id} = req.params;
//   const data = req.body;
//   console.log(data)
//   const ind = users.findIndex((each)=>each.id===id)
//   if(ind===-1){
//     return res.status(404).json({
//       "success" : false,
//       "message" : `User not present with ${id}`
//     })
//   }
//   const updatedUser = {...users[ind],...data}
//   users[ind] = updatedUser;
//   res.status(200).json({
//     "success":true,
//     "message" : "User details updated successfully",
//     "data": updatedUser
//   })
// })
router.put("/:id",updateUser)
// router.delete("/:id",(req,res)=>{
//   const {id} = req.params
//   const ind = users.findIndex((each)=>each.id===id)
//   if(ind===-1){
//     return res.status(404).json({
//       "success" : false,
//       "message" : `User not present with ${id}`
//     })
//   }
//   users.splice(ind,1)
//   res.status(200).json({
//     "success":true,
//     "message" : "User deleted successfully"
//   })
// })
router.delete("/:id",deleteUser)
router.get("/subscription/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id===id)
    if(!user){
      res.status(404).json({
        "success":false,
        "message" : `User not found with id ${id}`
      })
    }
    function getCurrentDateInDays(data=''){
      let date = data?new Date(data):new Date();
      return Math.floor(date/(1000*60*60*24))
    }

// >> Basic (3 months)
// >> Standard (6 months)
// >> Premium (12 months)

// If a user missed the renewal date, then user should be collected with $100 If a user misses his subscription, then user is expected to pay $100 If a user misses both renewal & subscription, then the collected amount should be $200
  const subsType = (date)=>{
    if(users.subscriptionType==="Basic")
      date+=90
    else if(users.subscriptionType==="Standard")
      date+=180
    else if(users.subscriptionType==="Premium")
      date+=365
    return date;
  }
  let returnDate = getCurrentDateInDays(user.returnDate)
  let currentDate = getCurrentDateInDays();
  let subscriptionDate = getCurrentDateInDays(user.subscriptionDate)
  let subsExpiration = subsType(subscriptionDate);
  let data = {
    ...user,
    subsExpired : subsExpiration<currentDate,
    subsDaysLeft : subsExpiration - currentDate,
    daysLeftForExpiry : returnDate - currentDate,
    returnDate :  returnDate<currentDate?"Book is overdue":returnDate,
    fine: returnDate<currentDate?subsExpiration<=currentDate?200:100:0    
  }
  res.json({
    "success":true,
    data
  })
})
module.exports = router;