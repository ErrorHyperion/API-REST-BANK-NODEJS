const CustomerService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

CustomerService.create = async (customer) => {
    const customerFound = await CustomerRepository.findById(customer.id)

    if(customerFound.length > 0) {
        throw new Error('Customer already exist')
    }

    await CustomerRepository.create(customer)
 }

CustomerService.edit = async (id, customer) => {
    const customerFound = await CustomerRepository.findById(id)

    if(customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    await CustomerRepository.edit(id,customer)
}

CustomerService.delete = async (id) => {
    const customerAccounts = await AccountRepository.listAccountsByCustomer(id)

    if(customerAccounts.length > 0) {
        throw new Error('Customer with accounts, can not be deleted')
    }

    await CustomerRepository.delete(id)
}

CustomerService.findCustomer = async (id) => {
    const customers = await CustomerRepository.findById(id)

    if (customers.length === 0) return undefined

    return customers[0]
}