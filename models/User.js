

const mongoose = require("mongoose");


const UserSchema= new mongoose.Schema ({

    username : {type:String ,
        required :true
    } ,

   hashedPassword: {
    type: String,
    required: true,
  },
  isAdmin : {
    type : Boolean,
    required :true
  }

})


UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User",UserSchema)