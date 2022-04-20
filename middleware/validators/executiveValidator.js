const {check} = require('express-validator');
const req = require('express/lib/request');
const {validator} = require('../../helpers/validator')
const executive = require('../../models').Executive;

const validateC = [
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
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

const validateU = [
    
    check('name','Its necessary the name').not().isEmpty(),
    check('lastname', 'Its necessary the last name').not().isEmpty(),
    check('userid').custom(async (value) => {
        try{ 
        const data = await executive.findOne({where: {userid: value}})
        if(data.userid===value && data.id===req.params.id) return true
        console.log('hola')
        if(data)
            return Promise.reject('The user already exist')
        return true;
        }catch(error){
        }
    }),
    check('AreaId','Its necessary the area').not().isEmpty(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validateC,validateU}