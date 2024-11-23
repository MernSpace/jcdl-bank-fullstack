const addBalanceModel = require('../model/addBalanceModel');
const customerModel = require('../model/customerModel');

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



exports.readBalanceList =async (req, res) => {
    try{
        let data =await addBalanceModel.find({});
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}


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
