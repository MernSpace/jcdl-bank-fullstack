const mongoose= require('mongoose');
const dataSchema= mongoose.Schema({
    Name:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:String}
},{ timestamps:true ,versionKey:false})

const userModel = mongoose.model('users',dataSchema);
module.exports =userModel
