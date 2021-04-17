// importando el repositorio...
const ClientRepository = require('./app/repositories/CustomerRepository')
const AccountRepository = require('./app/repositories/AccountRepository')
const CustomerService = require('./app/services/CustomerService')
const AccountService = require('./app/services/AccountService')

console.log('probando ...')

// CustomerReporitory's Tests
async function createCustomerTest() {
    await ClientRepository.create({
        name: 'juan',
        lastname: 'villanueva',
        id: '4321',
        email: 'juan@eam.edu.co'
    })

    findCustomerTest().then(console.log('OK'))
}

async function findCustomerTest() {
    const customer = await ClientRepository.findById('4321')
    console.log(customer)
}

async function editCustomerTest() {
    await ClientRepository.edit('4321', {
        name: 'manuel',
        lastname: 'villanueva',
        id: '4321',
        email: 'juan@eam.edu.co'
    })

    findCustomerTest().then(console.log('OK'))
}

async function deleteCustomerTest() {
    await ClientRepository.delete('4321')

    findCustomerTest().then(console.log('OK'))
}

// AccountRepository's tests
async function createAccountTest() {
    await AccountRepository.create({
        id: '124',
        amount: 1000,
        customerid: '4321',
        opendat: new Date()
    })
}

async function deleteAccountTest() {
    await AccountRepository.delete('124');
}

async function listAccountsByCustomer() {
    const accounts = await AccountRepository.listAccountsByCustomer('4321')
    console.log(accounts)
}

// CustomerService's Tests
async function createAccountServiceTest() {
    await CustomerService.create({
        id: '2345',
        lastname: 'Guzman',
        name: 'Pablo',
        email: 'pGuzman@eam.edu.co'
    })
}

async function editAccountServiceTest() {
    await CustomerService.edit('2345', {
        lastname: 'Rios',
        name: 'Pablo',
    })
}

async function deleteAccountServiceTest() {
    await CustomerService.delete('4321')
}

async function buscarAccountServiceTest() {
    const customer = await CustomerService.findCustomer('4321')
    console.log(customer)
}

// AccountService's Tests
async function listAccountsByCustomerServiceTest() {
    const result = await AccountService.listoAccountsByCustomer('22')
    console.log(result)
}

async function createAccountServiceTest() {
    await AccountService.create({
        id:'321',
        customerid: '4321'
    })
}

createAccountServiceTest().then(console.log('OK'))
