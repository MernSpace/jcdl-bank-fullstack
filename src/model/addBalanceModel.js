const mongoose= require('mongoose');
const {Types} = require("mongoose");
const dataSchema= mongoose.Schema({
    cusID:{type:String},
    balance:{type:Number},
    invoiceID:{type:String},
},{ timestamps:true ,versionKey:false});

const addBalanceModel = mongoose.model('adds',dataSchema);
module.exports =addBalanceModel
