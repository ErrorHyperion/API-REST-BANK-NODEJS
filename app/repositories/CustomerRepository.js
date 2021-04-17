const CustomerRepository = module.exports
const DB = require('../config/database')

CustomerRepository.create = (customer) => {
    return DB('customers').insert(customer)
}

CustomerRepository.findById = (id) => {
    return DB('customers').where({id: id}).select('*')
}

CustomerRepository.edit = (id, customer) => {
    return DB('customers').where({id: id}).update(customer)
}

CustomerRepository.delete = (id) => {
    return DB('customers').where({id: id}).del()
}