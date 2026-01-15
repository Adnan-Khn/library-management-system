const mongoose = require("mongoose");

function dbConnection() {
  const DB_URL = process.env.MONGO_URI;
  if (!DB_URL) {
    console.error("MONGO_URI is not defined");
    process.exit(1);
  }
  mongoose.connect(DB_URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Database connected successfully");
  });
}
module.exports = dbConnection;  
