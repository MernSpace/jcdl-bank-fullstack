const addBalanceModel = require('../model/addBalanceModel');
const customerModel = require('../model/customerModel');
const mongoose = require('mongoose');

exports.addBalance =async (req, res) => {
    try{
      let postBody = req.body;
      let cusID = req.params.id;
      postBody.cusID = cusID;

      let data = await customerModel.find({_id:cusID});
      let previousBalance =(data[0].balance)
        let newBalance = parseInt(previousBalance, 10) + parseInt(postBody.balance, 10);

      let Query = {_id:cusID};
      let customerBalanceData = await customerModel.updateOne(Query,{balance:newBalance});

      let createData = await addBalanceModel.create(postBody)
      res.status(200).json({createData,customerBalanceData});
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}
// Path to your balance model

exports.readBalanceList = async (req, res) => {
    try {
        const data = await addBalanceModel.aggregate([
            {
                // Convert cusID (which is a string) to ObjectId dynamically
                $addFields: {
                    cusID: { $toObjectId: "$cusID" }  // Convert cusID to ObjectId
                }
            },
            {
                // Perform $lookup with customers collection
                $lookup: {
                    from: 'customers',  // Make sure this matches the name of your customers collection
                    localField: 'cusID', // Field from Balance (cusID)
                    foreignField: '_id', // Field from Customer (_id)
                    as: 'customerDetails' // Result field that will hold the customer details
                }
            },
            {
                // Unwind customerDetails if you want a flat result
                $unwind: {
                    path: '$customerDetails',
                    preserveNullAndEmptyArrays: true  // If no matching customer, still include balance data
                }
            },
            {
                // Project the necessary fields
                $project: {
                    _id: 1,
                    cusID: 1,
                    balance: 1,
                    invoiceID: 1,
                    customerDetails: {
                        _id: 1,
                        fName: 1, // Include relevant fields from the customer model
                        address: 1,
                        phone: 1
                    },
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);

        // Send the result
        if (data.length === 0) {
            return res.status(404).json({ message: "No balances found or customers not linked." });
        }

        res.status(200).json(data);

    } catch (e) {
        console.error(e);  // Log error for debugging
        res.status(500).send({ error: e.message });
    }
};






exports.updateBalance = async (req, res) => {
    try{
        let id = req.params.id;
        let Query = {_id:id};
        let data = await addBalanceModel.find(Query)

        res.status(200).json({
            data: data,
            code: "contact database manager"
        });
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}

exports.deleteBalance =async (req, res) => {
    try{
        let ads = req.params.invID;
        let balanceData = await addBalanceModel.findById(ads);

        let cID = (balanceData.cusID)
        let addBalance = (balanceData[0].balance)

        let cusQuery = {_id: cID}

        let cusDetail = await customerModel.find(cusQuery)
        let cusBalance = (cusDetail[0].balance)

        let upBalance = cusBalance - addBalance
        let upData = await  customerModel.updateOne(cusQuery,{balance:upBalance});


        res.status(200).json({balanceData, upData});
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}


exports.detailBalance =async (req, res) => {
    try{
        let ads = req.params.id;
        let data =await addBalanceModel.find({_id:ads});

        let cID = (data[0].cusID)
        let cusQuery = {_id: cID}
        let cusDetail = await customerModel.find(cusQuery)

        res.status(200).json({data,cusDetail});
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}
