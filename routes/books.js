const express = require("express");
// const {books} = require("../data/books.json");
// const {users} = require("../data/users.json");

// const {UserModel,BookModel} = require("../models");
const {getAllBooks, getBookById, createBook, updateBook, deleteBook, getAllIssuedBooks} = require("../controllers/books-controllers")
const router = express.Router();

// router.get("/",(req,res)=>{
//   res.status(200).json({
//     "success": true,
//     "data":books
//   })
// })
router.get("/",getAllBooks)

// router.get("/issued/by-user",(req,res)=>{
//   const userwithIssuedBooks = users.filter((each)=>each.issuedBook)
//   //console.log(userwithIssuedBooks)
//   const booksIssued=[]
//   userwithIssuedBooks.forEach((user)=>{
//     const book = books.find((each)=>each.id===user.issuedBook)
//     book.issuedBy = user.name
//     book.issueDate = user.issuedDate
//     book.returnDate = user.returnDate
//     booksIssued.push(book)
//   })
//   console.log(booksIssued)
//   if(!booksIssued===0){
//     return res.status(404).json({
//       "success":false,
//       "message":"No books are issued currently"
//     })
//   }
//   res.status(200).json({
//     "success": true,
//     "data": booksIssued
//   })
// })
router.get("/issuedBooks",getAllIssuedBooks)

// router.get("/:id",(req,res)=>{
//   const {id} = req.params
//   const book = books.find(each=>each.id===id)
//   if(!book){
//     return res.status(404).json({
//       "success":false,
//       "message":"Book not Found!!!"
//     })
//   }
//   res.status(200).json({
//     "success": true,
//     "data":book
//   })
// })
router.get("/:id",getBookById)
// router.post("/",(req,res)=>{
//   const {id,name,author,genre,price,publisher} = req.body;
//   if(!id || !name || !author || !genre || !price || !publisher){
//     return res.status(400).json({
//       "success":false,
//       "message":"Please provide all required fields"
//     })
//   }
//   const book = books.find(each=>each.id===id)
//   if(book){
//     return res.status(409).json({
//       "success":false,
//       "message":`Book with id ${id} already exists`
//     })
//   }
//   books.push({id,name,author,genre,price,publisher})
//   res.status(201).json({
//     "success":true,
//     "message":"Book added successfully"
//   })
// })
router.post("/",createBook)
// router.put("/:id",(req,res)=>{
//   const {id} = req.params;
//   const data = req.body;
//   const ind = books.findIndex((each)=>each.id===id)
//   if(ind===-1){
//     return res.status(404).json({
//       "success" : false,
//       "message" : `Book not present with ${id}`
//     })
//   }
//   const updatedBook = {...books[ind],...data}
//   books[ind] = updatedBook;
//   res.status(200).json({
//     "success":true,
//     "message" : "Book details updated successfully",
//     "data": updatedBook
//   })
// })
router.put(":id",updateBook)
// router.delete("/:id",(req,res)=>{
//   const {id} = req.params
//   const ind = books.findIndex((each)=>each.id===id)
//   if(ind===-1){
//     return res.status(404).json({
//       "success" : false,
//       "message" : `Book not present with ${id}`
//     })
//   }
//   books.splice(ind,1)
//   res.status(200).json({
//     "success":true,
//     "message" : "Book deleted successfully"
//   })
// })
router.delete("/id",deleteBook)


module.exports = router;