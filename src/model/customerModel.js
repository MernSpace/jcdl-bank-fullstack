const mongoose= require('mongoose');
const dataSchema= mongoose.Schema({
    fName:{type:String},
    lName:{type:String},
    address:{type:String},
    phone:{type:String},
    balance:{type:Number}
},{ timestamps:true ,versionKey:false})

const customerModel = mongoose.model('customers',dataSchema);
module.exports =customerModel
