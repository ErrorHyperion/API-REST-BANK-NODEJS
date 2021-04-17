const AccountRepository = module.exports
const DB = require('../config/database')

AccountRepository.create = (account) => {
    return DB('accounts').insert(account)
}

AccountRepository.delete = (id) => {
    return DB('accounts').where({id: id}).del()
}

AccountRepository.listAccountsByCustomer = (customerid) => {
    return DB('accounts').where({customerid: customerid}).select('*')
}

AccountRepository.edit = (id, account) => {
    return DB('accounts').where({id: id}).update(account)
}

AccountRepository.findById = (id) => {
    return DB('accounts').where({id: id}).select('*')
}
