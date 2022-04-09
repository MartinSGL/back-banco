//modelo requerido
const client = require('../models').Client
const token = require('../models').Token;
require('dotenv').config();

//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');

const modelName = 'Token'

module.exports = {
    async create(req,res){
        try{
            
            let randnum = Math.floor(Math.random() * 900000) + 100000;
            let hours = 1;
            let date = new Date();
            let expire_token = new Date(new Date(date).setHours(date.getHours() + hours));
            let {id} = req.params // obtener el id destructurado del parametro enviado por la URL

            //buscar si existe el ClientId en la base de datos o si no crear un nuevo token
            let idFound = await token.findOne({where:{ClientId:id}}) //comprobar si existe el id en la base de datos
            //regresar error NOT_FOUND = 404 en caso de no encontrar
            let data
            if (idFound===null) {
                data = await token.create({ClientId:id,expire_date:expire_token,token:randnum});
            }else{
                data = await idFound.update({expire_date:expire_token,token:randnum});
            }

            let clientf = await client.findOne({where:{id:id}})
            //create transporter
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
            //create mail options
            let mailOptions = {
                from: 'BanTexico',
                to: clientf.email,
                subject: 'Token de acceso',
                text: 'Hola ' + clientf.name + ' ' + clientf.lastname + '\n' + 'Tu token de acceso es: ' + randnum
            };
            //send mail
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(ERROR).send(resError(error));
                }
                console.log('Email sent: ' + info.response);
                return res.status(OK).json(resOk(data));      
            });
        }catch(err){
            //si se comete un error mandar un status ERROR = 400
            return res.status(ERROR).send(resError(err));
        }
    },
    async validateT(req,res){
        try{
            let {id} = req.params // obtener el id destructurado del parametro enviado por la URL

            let {tokenf} = req.body // obtener el token destructurado del body enviado por la URL
            //compobar si el token aun esta vigente

            let tokenFound = await token.findOne({where:{token:tokenf,ClientId:id,expire_date:{[Op.gt]:new Date()}}});

            if(tokenFound===null){
                return res.status(OK).json(resError("invalid token",null)) 
            }else{
                return res.status(OK).json(resOk("Correcto el token"))
            }
        }catch(error){
            //si se comete un error mandar un status ERROR = 400
            return res.status(ERROR).json(resError(error));
        }
    }
}