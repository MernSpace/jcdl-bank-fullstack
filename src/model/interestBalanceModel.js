const mongoose= require('mongoose');
const {Types} = require("mongoose");
const dataSchema= mongoose.Schema({
    cusID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    balance:{type:Number},
    invoiceID:{type:String},
},{ timestamps:true ,versionKey:false});

const interestBalanceModel = mongoose.model('interest',dataSchema);
module.exports =interestBalanceModel
