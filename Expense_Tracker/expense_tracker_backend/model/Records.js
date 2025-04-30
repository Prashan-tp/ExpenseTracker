const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    amount:{
       type:String,
   },
   category:{
    type:String,
},
description:{
       type:String,
   },
   date:{
       type:Date ,
   },
   user:{
     type:mongoose.SchemaTypes.ObjectId ,
     ref:'User'
 }
});
const Record = mongoose.model('Record',recordSchema);
module.exports=Record ;