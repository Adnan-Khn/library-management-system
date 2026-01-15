const {UserModel,BookModel} = require("../models")

exports.getAllBooks = async(req,res)=>{
  try{
    const books = await BookModel.find()
    if(!books || books.length===0){
      return res.status(404).json({
        "success":false,
        "message" : "No books found"
      })
    }
    return res.status(200).json({
      "success":true,
      "data":books
    })
  }catch(error){
    console.error("Error fetching books:", error);
    return res.status(500).json({
      "success":false,
      "message":"Internal server error"
    })
  }
}
exports.getBookById = async(req,res)=>{
  const {id} = req.params
  try{
    const book  = await BookModel.findById(id)
    if(!book){
      return res.status(404).json({
        "success":false,
        "message" : `Book not found with id ${id}`
      })
    }
    return res.status(200).json({
      "success": true,
      "data": book
    })
  }catch(err){
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.createBook = async(req,res)=>{
  try{
    const newBook = await BookModel.create(req.body)
    return res.status(201).json({
      "success": true,
      "message": "Book created successfully",
      "data": newBook
    })
  }catch(err){
    if(err.code===11000){
      return res.status(409).json({
        "success": false,
        "message": "Book already exists"
      })
    }
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.updateBook = async(req,res)=>{
  const {id} = req.params
  const data = req.body
  try{
    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      {$set:data},
      {new:true,runValidators:true}
    )
    if(!updatedBook){
      return res.status(404).json({
        "success":false,
        "message":`Book not found with id ${id}`
      })
    }
    return res.status(200).json({
      "success": true,
      "message": "Book updated successfully",
      "data": updatedBook
    })
  }
  catch(err){
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.deleteBook = async(req,res)=>{
  const {id} = req.params
  try{
    const deletedBook = await BookModel.findByIdAndDelete(id)
    if(!deletdBook){
      return res.status(404).json({
        "success":false,
        "message":`Book not found with id ${id}`
      })
    }
    return res.status(200).json({
      "success": true,
      "message": "Book deleted successfully"
    })
  }catch(err){
    return res.status(500).json({
      "success": false,
      "message": err.message
    })
  }
}
exports.getAllIssuedBooks = async(req,res)=>{
  try {
    const usersWithIssuedBooks = await UserModel
      .find({ issuedBook: { $ne: null } })
      .populate("issuedBook");

    if (usersWithIssuedBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books are issued currently",
      });
    }

    const booksIssued = usersWithIssuedBooks.map((user) => {
      return {
        ...user.issuedBook.toObject(),
        issuedBy: user.name,
        issueDate: user.issuedDate,
        returnDate: user.returnDate,
      };
    });

    res.status(200).json({
      success: true,
      data: booksIssued,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}