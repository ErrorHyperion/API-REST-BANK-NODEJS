const express = require('express')
const CustomerController = require('../controllers/CustomerController')
const AccountController = require('../controllers/AccountController')

const router = express.Router()

//Customer's Routes
router.post('/customers', CustomerController.create)
router.delete('/customers/:id', CustomerController.delete)
router.put('/customers/:id', CustomerController.edit)
router.get('/customers/:id', CustomerController.find)

//Client's Routes
router.get('/customers/:id/accounts', AccountController.listAccountsByCustomer)
router.put('/customers/:idcustomer/accounts/:idaccount/add', AccountController.addAmount)
router.put('/customers/:idcustomer/accounts/:idaccount/subtract', AccountController.subtractAmount)
router.put('/customers/:idcustomer/accounts/:idaccount/transfere', AccountController.transfereAmount)
router.post('/accounts', AccountController.create)
router.delete('/customers/:idcustomer/accounts/:idaccount', AccountController.delete)

module.exports = router