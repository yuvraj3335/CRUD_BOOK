const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    //required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  thumbnail: {
    type: String,
    //required: true,
  },
  stars: {
    type: Number,
    //required: true,
  },
  category: {
    type: Array,
    //required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//const adminSchema = new mongoose.Schema( {  
  //username: {type : String , required : true , unique  : true },
  //password: {type: String , required: true}
//})

//const adminModel = mongoose.model ('Admin' , adminSchema)


//const Book = mongoose.model("Book", BookSchema);
//const Admin = mongoose.model("Admin", adminSchema);

module.exports = mongoose.model("Book", BookSchema);

