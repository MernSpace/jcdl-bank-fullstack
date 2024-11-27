const express = require('express');
const router = express.Router();

const customerController = require('../controller/customerController');
const addBalanceController = require('../controller/addBalanceController');
const userController = require('../controller/userController');

//user API
router.post('/create-user', userController.createUser);
router.post('/user-login', userController.loginUser);
router.get('/user-detail/:id', userController.detailUser);
router.post('/user-update/:id', userController.updateUser);
router.get('/user-delete/:id', userController.deleteUser);


//customer API
router.post('/create-customer', customerController.createCustomer);
router.get('/read-customer', customerController.readCustomer);
router.post('/update-customer/:id', customerController.updateCustomer);
router.get('/delete-customer/:id', customerController.deleteCustomer);
router.get('/detail-customer/:id', customerController.detailCustomer);


//balance API
router.post('/add-balance/:id', addBalanceController.addBalance);
router.post('/add-all-balance', addBalanceController.readBalanceList);

router.get('/update-balance/:id', addBalanceController.updateBalance);
router.get('/delete-balance/:invID', addBalanceController.deleteBalance);
router.get('/detail-add-balance/:id', addBalanceController.detailBalance);

//


module.exports=router;
