const {UserModel,BookModel} = require("../models")

exports.getAllUsers = async(req,res)=>{
  try{
    const users = await UserModel.find()
    if(!users||users.length===0){
      return res.status(404).json({
        "success":false,
        "message" : "No users found"
      })
    }
    res.status(200).json({
      "success": true,
      "data": users
    })
  }catch(err){
    res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.getUserById = async(req,res)=>{
  const {id} = req.params
  try{
    const user = await UserModel.findById(id)
    if(!user){
      return res.status(404).json({
        "success":false,
        "message":`User not found with id ${id}`
      })
    }
    res.status(200).json({
      "success": true,
      "data": user
    })
  }catch(err){
    res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.postUser = async(req,res)=>{
  //const data = req.body
  try{
    const newUser = await UserModel.create(req.body)
    return res.status(201).json({
      "success": true,
      "message": "User created successfully",
      "data": newUser
    })
  }catch(err){
    if(err.code===11000){
      return res.status(409).json({
        "success": false,
        "message": "User already exists"
      })
    }
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.updateUser = async(req,res)=>{
  const {id}=req.params
  const data = req.body
  try{
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {$set:data},
      {new:true,runValidators:true}
    )
    if(!updatedUser){
      return res.status(404).json({
        "success" : false,
        "message" : `User not present with id ${id}`
      })
    }
    return res.status(200).json({
      "success":true,
      "message" : "User details updated successfully",
      "data": updatedUser
    })
  }
  catch(err){
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.deleteUser = async(req,res)=>{
  const {id} = req.params
  try{
    const deletedUser = await UserModel.findByIdAndDelete(id)
    if(!deletedUser){
      return res.status(404).json({
        "success" : false,
        "message" : `User not present with id ${id}`
      })
    }
    return res.status(200).json({
      "success":true,
      "message" : "User deleted successfully"
    })
  }catch(err){
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.subsCriptionDetails = async(req,res)=>{
  const {id} = req.params
  try{
    const user = await UserModel.findById(id)
    if(!user){
      return res.status(404).json({
        "success":false,
        "message" : `User not found with id ${id}`
      })
    }
    function getCurrentDateInDays(data="") {
      const date = data===""?new Date():new Date(data)
      const days = Math.floor(date/(1000*60*60*24))
      return days
    }
    const subsType = (date)=>{
      if(user.subscriptionType==="Basic"){
        date+=90
      }else if(user.subscriptionType==="Standard"){
        date+=180
      }else if(user.subscriptionType==="Premium"){
        date+=365
      }
      return date;
    }
    let returnDate = getCurrentDateInDays(user.returnDate)
    let currentDate = getCurrentDateInDays();
    let subscriptionDate = getCurrentDateInDays(user.subscriptionDate)
    let subsExpiration = subsType(subscriptionDate);
    let data = {
      ...user._doc,
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
  }catch(err){
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}