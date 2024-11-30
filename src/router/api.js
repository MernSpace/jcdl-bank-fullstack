const express = require('express');
const router = express.Router();

const customerController = require('../controller/customerController');
const addBalanceController = require('../controller/addBalanceController');
const userController = require('../controller/userController');
const interestBalanceController = require('../controller/interestBalanceContorller');
const auth = require('../auth/userAuth');

//user API
router.post('/create-user', userController.createUser);
router.post('/user-login', userController.loginUser);
router.get('/user-detail/:id', auth, userController.detailUser);
router.post('/user-update/:id', auth, userController.updateUser);
router.get('/user-delete/:id', auth, userController.deleteUser);


//customer API
router.post('/create-customer', auth, customerController.createCustomer);
router.get('/read-customer', auth, customerController.readCustomer);
router.post('/update-customer/:id', auth, customerController.updateCustomer);
router.get('/delete-customer/:id', auth, customerController.deleteCustomer);
router.get('/detail-customer/:id', auth, customerController.detailCustomer);
router.get('/customer-balance-detail/:id', auth, customerController.customerBalanceDetail);


//balance API
router.post('/add-balance/:id', auth, addBalanceController.addBalance);
router.get('/add-all-balance', auth, addBalanceController.readBalanceList);

router.get('/update-balance/:id', auth, addBalanceController.updateBalance);
router.get('/delete-balance/:invID', auth, addBalanceController.deleteBalance);
router.get('/detail-add-balance/:id', auth, addBalanceController.detailBalance);

router.post('/withdraw-balance/:cusID', auth, addBalanceController.withdrawBalance);

//interest API

router.post('/add-interest/:id',auth,interestBalanceController.addInterestBalance)
router.get('/all-interest-balance', auth, interestBalanceController.readInterestBalanceList);

router.get('/update-interest/:id', auth, interestBalanceController.addInterestBalance);
router.get('/delete-interest/:invID', auth, interestBalanceController.deleteInterestBalance);
router.get('/detail-interest-balance/:id', auth, interestBalanceController.detailInterestBalance);






module.exports = router;
