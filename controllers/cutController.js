const cut = require('../models').Cut;
const denomination = require('../models').Denomination;
const {sequelize} = require('../models');


const validate = (denomination,amount)=>{
    let total = 0;
    denomination.forEach((el)=>{

    })
}

module.exports = {
    index(req,res){
        return cut.findAll({ include:[{model:denomination, through: {attributes: ["amount"]}}]})
        .then(cut => res.status(200).send({'cuts':cut}))
        .catch(error => res.status(400).send(error));
    },
    async create(req, res){
        try{
            //datos para cortes
            let {total,differences,type,CashboxId,ExecutiveId} = req.body
            //1,2,3,4,5,6,7,8,9,10,11,12 datos para cantidad de tipos de monedas
            let denominacion = req.body.denominacion
            //validar que el total coincida con las denominaciones
            //validate(monedas,total)

            // //iniciar transaccion
            const result = await sequelize.transaction(async (t) => {
                //guardar los datos en la tabla pivote de cortes
                let corte = await cut.create({total,differences,type,CashboxId,ExecutiveId},{ transaction: t })
                for (const key in denominacion) {
                    if(denominacion[key]!==0) 
                    await corte.addDenomination(key,{through:{amount: denominacion[key]},transaction: t})                    
                }     

                return res.status(200).send('corte guardado')
            })
          
            
        }catch(error){
            console.log(error)
            return res.status(400).send(error)
            
        }
    }
}