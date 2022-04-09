const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')
const executive = require('../../models').Executive;

const validate = [
    check('name','Its necessary the name').not().isEmpty(),
    check('lastname', 'Its necessary the last name').not().isEmpty(),
    check('userid').custom(async (value) => {
        try{ 
        const data = await executive.findOne({where: {userid: value}})
        if(data)
            return Promise.reject('The user already exist')
        return true;
        }catch(error){
        }
    }),
    check('password','Its necessary the password').isLength({min: 8}),
    check('AreaId','Its necessary the area').not().isEmpty(),
    check('PositionId','Its necessary the position').not().isEmpty(),
    check('BranchId','Its necessary the branch').not().isEmpty(),
    check('date_init','Its necessary the the init_date').not().isEmpty(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}