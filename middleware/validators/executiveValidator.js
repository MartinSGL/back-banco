const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')
const executive = require('../../models').Executive;

const validate = [
    check('name','Its necessary the name').not().isEmpty(),
    check('lastname', 'Its necessary the last name').not().isEmpty(),
    check('userid').custom(async (value) => {
        try{ 
        const data = await executive.findOne({where: {userid: value}})
        console.log(data)
        if(data)
            return Promise.reject('The user already exist')
        return true;
        }catch(error){
        }
    }),
    check('password').isLength({min: 8}),
    check('AreaId','Its necessary the area').not().isEmpty(),
    check('PositionId','Its necessary the position').not().isEmpty(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}