const AccountController = module.exports

const AccountService = require('../services/AccountService')

AccountController. listAccountsByCustomer = async (req, res, next) => {
    const params = req.params

    try {
        const response = await AccountService.listoAccountsByCustomer(params.id)
        res.send(response)
    } catch(error) {
        console.log({error})
        res.status(500).send({error: error.message}).end()
        next(error)
    }
}

AccountController.create = async (req, res, next) => {
    const body = req.body

    try {
        await AccountService.create(body)
        res.send({message: 'account created'})
    } catch(error) {
        console.log({error})
        res.status(500).send({error:error.message}).end()
        next(error)
    }
}

AccountController.delete = async (req, res, next) => {
    const params = req.params

    try {
        await AccountService.delete(params.idcustomer, params.idaccount)

        res.send({message: 'Account Canceled'})
    } catch(error) {
        console.log({error})
        res.status(500).send({error: error.message}).end()
        next(error)
    }
}

AccountController.addAmount = async (req, res, next) => {
    const params = req.params
    const body = req.body

    try {
        await AccountService.addAmount(params.idcustomer, params.idaccount, body.amount)

        res.send({message: 'Amount added to the account'})
    } catch(error) {
        console.log({error})
        res.status(500).send({error: error.message}).end()
        next(error)
    }
}

AccountController.subtractAmount = async (req, res, next) => {
    const params = req.params
    const body = req.body

    try {
        await AccountService.subtractAmount(params.idcustomer, params.idaccount, body.amount)

        res.send({message: 'Amount subtracted to the account'})
    } catch(error) {
        console.log({error})
        res.status(500).send({error: error.message}).end()
        next(error)
    }
}

AccountController.transfereAmount = async (req, res, next) => {
    const params = req.params
    const body = req.body

    try {
        await AccountService.transfereAmount(params.idcustomer, params.idaccount, body.amount, body.targetaccountid)

        res.send({message: 'Amount transfere to the account'})
    } catch(error) {
        console.log({error})
        res.status(500).send({error: error.message}).end()
        next(error)
    }
}
