const loginRoutes = require('./loginRoutes')
const executiveRoutes = require('./executiveRoutes')
const positionRoutes = require('./positionRoutes')
const areaRoutes = require('./areaRoutes')
const commissionRoutes = require('./commissionRoutes')
const conceptRoutes = require('./conceptRoutes')
const denominationRoutes = require('./denominationRoutes')
const tokenRoutes = require('./tokenRoutes')
const clientRoutes = require('./clientRoutes')
const cutRoutes = require('./cutRoutes')
const creditdetailRoutes = require('./creditdetailRoutes')
const interestRoutes = require('./interestRoutes')
const mortgagesRoutes = require('./mortgageRoutes')
const accountRoutes = require('./accountRoutes')
const cardRoutes = require('./cardRoutes')
const transactionRoutes = require('./transactionRoutes')
const documentRoutes = require('./documentRoutes')
const guaranteeRoutes = require('./guaranteeRoutes')
const beneficiaryRoutes = require('./beneficiaryRoutes')
const propertyRoutes = require('./propertyRoutes')
const cashboxRoutes = require('./cashboxRoutes')



module.exports = app => {
    //login
    app.use(loginRoutes)
    //executive
    app.use(executiveRoutes)
    //areas
    app.use(areaRoutes)
    //commissions
    app.use(commissionRoutes)
    //concepts
    app.use(conceptRoutes)
    //denominations
    app.use(denominationRoutes)
    //documents
    app.use(documentRoutes)
    //positions
    app.use(positionRoutes) 
    //clave para realizar transacciones
    app.use(tokenRoutes)
    //clients
    app.use(clientRoutes)
    //cuts
    app.use(cutRoutes)
    //interest
    app.use(interestRoutes)
    //creditdetails
    app.use(creditdetailRoutes)
    //morgages
    app.use(mortgagesRoutes)
    //accounts
    app.use(accountRoutes)
    //cards
    app.use(cardRoutes)
    //transactions
    app.use(transactionRoutes)
    //guarantees
    app.use(guaranteeRoutes)
    //beneficiaries
    app.use(beneficiaryRoutes)
    //properties
    app.use(propertyRoutes)
    //transactions
    app.use(cashboxRoutes)
}