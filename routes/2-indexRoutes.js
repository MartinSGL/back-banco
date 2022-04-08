const loginRoutes = require('./loginRoutes')
const executiveRoutes = require('./executiveRoutes')
const positionRoutes = require('./positionRoutes')
const areaRoutes = require('./areaRoutes')
const commissionRoutes = require('./commissionRoutes')
const conceptRoutes = require('./conceptRoutes')
const denominationRoutes = require('./denominationRoutes')
const claveRoutes = require('./denominationRoutes')

module.exports = app => {
    //login
    app.use(loginRoutes)//alex
    //executive
    app.use(executiveRoutes) //manuel
    //areas
    app.use(areaRoutes) // moikas
    //commissions
    app.use(commissionRoutes) //ivan
    //concepts
    app.use(conceptRoutes) //salvador
    //denominations
    app.use(denominationRoutes) //kevin
    //positions
    app.use(positionRoutes) // tomen este como ejemplo
    //clave para realizar transacciones
    app.use(claveRoutes)//gaitan
}