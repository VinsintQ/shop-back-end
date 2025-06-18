const express = require("express");

const server = express();
const PORT = 3000;

//Controllers 

const userController = require("./controllers/users")



//Routes 


server.use("/users",userController);




server.listen(PORT, () => {
  console.log("The express app is ready!");
});