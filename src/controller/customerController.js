const customerModel = require('../model/customerModel');
const mongoose = require('mongoose');
const addBalanceModel = require('../model/addBalanceModel');


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
        let BalanceData = await addBalanceModel.deleteMany({cusID:cusID})
        res.status(201).json({data,BalanceData});
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


exports.customerBalanceDetail = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await customerModel.aggregate([
            {
                // Match the customer by the id (convert to ObjectId if necessary)
                $match: {
                    _id:  new mongoose.Types.ObjectId(id)
                }
            },
            {
                // Lookup the balance details from the 'adds' collection
                $lookup: {
                    from: 'adds',  // The 'adds' collection
                    localField: '_id',  // Match _id from the customers collection
                    foreignField: 'cusID',  // Match cusID from the adds collection
                    as: 'customerBalanceDetails'  // Store the results in 'customerBalanceDetails'
                }
            },
            {
                // Unwind to flatten the customerBalanceDetails array
                $unwind: {
                    path: '$customerBalanceDetails',
                    preserveNullAndEmptyArrays: true  // Keep customer even if there's no matching balance details
                }
            },
            {
                // Sort the balance details by createdAt in descending order (latest first)
                $sort: {
                    'customerBalanceDetails.createdAt': -1  // Sort the balance details
                }
            },
            {
                // Project the necessary fields from the customer and customerBalanceDetails
                $project: {
                    _id: 1,  // Customer ID
                    fName: 1,  // Customer first name
                    address: 1,  // Customer address
                    phone: 1,  // Customer phone
                    customerBalanceDetails: 1  // Balance details (including createdAt, invoiceID, balance, etc.)
                }
            }
        ]);

        // Check if data exists for the customer
        if (data.length === 0) {
            return res.status(404).json({ message: "Customer not found or no balance details available." });
        }

        // Send the result
        res.status(200).json(data);

    } catch (e) {
        console.error(e);  // Log error for debugging
        res.status(500).send({ error: e.message });
    }
};


