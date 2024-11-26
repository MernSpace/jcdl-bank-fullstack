const userModel = require('../model/userModel');
const CreateToken = require("../utlity/createToken");


exports.createUser =async (req, res) => {
    try{
        let postBody = req.body;
        let data = await userModel.create(postBody);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}

exports.loginUser = async (req, res) => {
    try {
        let userEmail = req.body.email;
        let userPassword = req.body.password;

        // Find the user by email
        let user = await userModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(401).send({ error: 'Email or password is incorrect' });
        }

        // Compare the entered password with the stored password (plaintext comparison)
        if (user.password !== userPassword) {
            return res.status(401).send({ error: 'Email or password is incorrect' });
        }
        let token = await CreateToken(user[0])
        return res.status(200).send({ status: 'login success' ,token: token });

    } catch (e) {
        console.error(e);
        return res.status(500).send({ error: 'Internal server error' });
    }
};





exports.readUser =async (req, res) => {
    try{
        let data =await userModel.find({});
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}


exports.updateUser =async (req, res) => {
    try{
        let ID = req.params.id;
        let postBody = req.body;
        let data = await userModel.updateOne({_id:ID},postBody);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}

exports.deleteUser =async (req, res) => {
    try{
        let cusID = req.params.id;
        let data = await userModel.deleteOne({_id:cusID});
        res.status(201).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}


exports.detailUser =async (req, res) => {
    try{
        let cusID = req.params.id;
        let data =await userModel.find({_id:cusID});
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send({error: e});
    }
}
