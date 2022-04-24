const loginRoutes = require('./loginRoutes')
const executiveRoutes = require('./executiveRoutes')
const positionRoutes = require('./positionRoutes')
const areaRoutes = require('./areaRoutes')
const commissionRoutes = require('./commissionRoutes')
const conceptRoutes = require('./conceptRoutes')
const denominationRoutes = require('./denominationRoutes')
const claveRoutes = require('./claveRoutes')
const clientRoutes = require('./clientRoutes')
const cutRoutes = require('./cutRoutes')
const creditdetailRoutes = require('./creditdetailRoutes')
const interestRoutes = require('./interestRoutes')
const morgagesRoutes = require('./morgageRoutes')
const accountRoutes = require('./accountRoutes')

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
    //positions
    app.use(positionRoutes) 
    //clave para realizar transacciones
    app.use(claveRoutes)
    //clients
    app.use(clientRoutes)
    //cuts
    app.use(cutRoutes)
    //interest
    app.use(interestRoutes)
    //creditdetails
    app.use(creditdetailRoutes)
    //morgages
    app.use(morgagesRoutes)
    //accounts
    app.use(accountRoutes)

}