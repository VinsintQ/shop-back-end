const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
require("./config/database.js");
const server = express();
server.use(express.json()); 
const PORT = 3000;

//Controllers 

const userController = require("./controllers/users")



//Routes 

server.use(morgan("dev"));
server.use("/users",userController);




server.listen(PORT, () => {
  console.log("The express app is ready!");
});