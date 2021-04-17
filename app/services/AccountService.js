const AccountService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

AccountService.listoAccountsByCustomer = async (customerid) => {
    const customerFound = await CustomerRepository.findById(customerid)

    if(customerFound === 0) {
        throw new Error('Customer does not exist')
    }

    return AccountRepository.listAccountsByCustomer(customerid)
}

AccountService.create = async (account) => {

    const accountFound = await AccountRepository.findById(account.id)

    if(accountFound.length > 0) {
        throw new Error('Account already created with that id')
    }

    const customerFound = await CustomerRepository.findById(account.customerid)

    if(customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    const accountsByCustomer = await AccountRepository.listAccountsByCustomer(account.customerid)

    if(accountsByCustomer.length >= 3) {
        throw new Error('no more than 3 accounts...')
    }

    account.openedat = new Date()
    account.amount = 0

    await AccountRepository.create(account)
}

AccountService.delete = async (customerid, accountid) => {

    const accounts = await AccountRepository.listAccountsByCustomer(customerid)
    
    if (accounts.length === 0)  {
        throw new Error('Customer does not exist')
    }

    const account = accounts.find(account => account.id === accountid)

    if(typeof account === 'undefined') {
        throw new Error('Account does not exist')
    }

    if(account.amount > 0) {
        throw new Error('Account can not be canceled. Amount most be in zero')
    }

    await AccountRepository.delete(accountid)
}

AccountService.addAmount = async (customerid, accountid, amount) => {
    const customer = await CustomerRepository.findById(customerid)

    if (customer.id === 0) {
        throw new Error('Customer does not exist')
    }

    const accounts = await AccountRepository.listAccountsByCustomer(customerid)

    if (accounts.length === 0)  {
        throw new Error('Customer does not have accounts')
    }

    let account = accounts.find(account => account.id === accountid)

    if(typeof account === 'undefined') {
        throw new Error('Account does not exist')
    }

    if(amount < 0) {
        throw new Error('Invalid amount to add')
    }

    account.amount += amount

    await AccountRepository.edit(accountid, account)
}

AccountService.subtractAmount = async (customerid, accountid, amount) => {

    const customer = await CustomerRepository.findById(customerid)

    if (customer.id === 0) {
        throw new Error('Customer does not exist')
    }
    
    const accounts = await AccountRepository.listAccountsByCustomer(customerid)

    if (accounts.length === 0)  {
        throw new Error('Customer does not have accounts')
    }

    let account = accounts.find(account => account.id === accountid)

    if(typeof account === 'undefined') {
        throw new Error('Account does not exist')
    }

    if(amount < 0 || amount > account.amount) {
        throw new Error('Invalid amount to add')
    }

    account.amount -= amount

    await AccountRepository.edit(accountid, account)
}

AccountService.transfereAmount = async (customerid, accountid, amount, targetaccountid) => {
    
    const customer = await CustomerRepository.findById(customerid)

    if (customer.id === 0) {
        throw new Error('Customer does not exist')
    }
    
    if(accountid === targetaccountid) {
        throw new Error('Target account is the same root account')
    }

    const accounts = await AccountRepository.listAccountsByCustomer(customerid)

    if (accounts.length === 0)  {
        throw new Error('Customer does not have accounts')
    }

    let account = accounts.find(account => account.id === accountid)

    if(typeof account === 'undefined') {
        throw new Error('Account does not exist')
    }

    let targetaccount = await AccountRepository.findById(targetaccountid)

    if(targetaccount.length === 0) {
        throw new Error('Target Account does not exist')
    }

    if(amount < 0 || amount > account.amount) {
        throw new Error('Invalid amount to add')
    }

    account.amount -= amount
    targetaccount[0].amount += amount

    await AccountRepository.edit(accountid, account)
    await AccountRepository.edit(targetaccountid, targetaccount[0])
}
