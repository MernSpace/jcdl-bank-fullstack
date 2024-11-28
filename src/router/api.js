const express = require('express');
const router = express.Router();

const customerController = require('../controller/customerController');
const addBalanceController = require('../controller/addBalanceController');
const userController = require('../controller/userController');
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

//


module.exports = router;
