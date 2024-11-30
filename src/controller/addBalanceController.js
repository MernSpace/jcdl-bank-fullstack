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

                $addFields: {
                    cusID: { $toObjectId: "$cusID" }
                }
            },
            {

                $lookup: {
                    from: 'customers',
                    localField: 'cusID',
                    foreignField: '_id',
                    as: 'customerDetails'
                }
            },
            {
                $unwind: {
                    path: '$customerDetails',
                    preserveNullAndEmptyArrays: true
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
                        fName: 1,
                        address: 1,
                        phone: 1
                    },
                    createdAt: 1,
                    updatedAt: 1
                }
            },
            {

                $sort: {
                    createdAt: -1
                }
            }
        ]);

        const formattedData = data.map((item) => {
            const createdDate = new Date(item.createdAt);
            const formattedDate = `${createdDate.getMonth() + 1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;
            item.createdAt = formattedDate; // Set the formatted date
            return item;
        });

        // Send the result
        if (formattedData.length === 0) {
            return res.status(404).json({ message: "No balances found or customers not linked." });
        }

        res.status(200).json(formattedData);  // Send the formatted data

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
        let balanceData = await addBalanceModel.findById({_id:ads});

        let cID = (balanceData.cusID)
        let addBalance = (balanceData.balance)


        let cusDetail = await customerModel.findById({_id:cID})
        let cusBalance = (cusDetail.balance)

        let upBalance = parseInt(cusBalance) - parseInt(addBalance)
        let upData = await  customerModel.updateOne({_id:cID},{balance:upBalance});
        let deleteData = await  addBalanceModel.deleteOne({_id:ads});


        res.status(200).json({deleteData, upData});
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


exports.withdrawBalance =async (req, res) => {
    try{
        let cusID = req.params.cusID;
        let withdrawBalance = req.body.balance
        let cusDetail = await customerModel.findById({_id:cusID})
        let cusBalance = (cusDetail.balance)

        let upBalance = parseInt(cusBalance) - parseInt(withdrawBalance)
        let upData = await  customerModel.updateOne({_id:cusID},{balance:upBalance});

        let createData = await addBalanceModel.create(req.body);


        res.status(200).json({ upData,createData});
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}