const customerModel = require('../model/customerModel');


exports.createCustomer =async (req, res) => {
    try{
        let postBody = req.body;
        let data = await customerModel.create(postBody);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}



exports.readCustomer =async (req, res) => {
    try{
        let data =await customerModel.find({});
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}


exports.updateCustomer =async (req, res) => {
    try{
        let ID = req.params.id;
        let postBody = req.body;
        let data = await customerModel.updateOne({_id:ID},postBody);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}

exports.deleteCustomer =async (req, res) => {
    try{
        let cusID = req.params.id;
        let data = await customerModel.deleteOne({_id:cusID});
        res.status(201).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}


exports.detailCustomer =async (req, res) => {
    try{
        let cusID = req.params.id;
        let data =await customerModel.find({_id:cusID});
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}
