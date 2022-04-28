//models required
const client = require("../models").Client;
const token = require("../models").Token;
//file .env required to get global settings
require("dotenv").config();
//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
const { resOk, resError } = require("../helpers/responses");
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND,} = require("../helpers/status");
//to make operations in queries
const { Op } = require("sequelize");
//package to send emails
const nodemailer = require("nodemailer");

const modelName = "Token";

module.exports = {
  //create a new token
  async create(req, res) {
    try {
      //variables to create the token
      let randnum = Math.floor(Math.random() * 900000) + 100000;
      let hours = 12;
      let date = new Date();
      let expire_token = new Date(
        new Date(date).setHours(date.getHours() + hours)
      );
      let { id } = req.body; // get the id from the parameter of body
      //prove if the id exists in the database
      let idFound = await token.findOne({ where: { ClientId: id } }); 
      //return error NOT_FOUND = 404 if the id is not found
      let data;
      //search if the client found, if not, create a new token
      if (idFound === null) {
        data = await token.create({
          ClientId: id,
          expire_date: expire_token,
          token: randnum,
        });
      } else {
        //if the client found, update the token
        data = await idFound.update({
          expire_date: expire_token,
          token: randnum,
        });
      }

      //find the client with the id 
      let clientf = await client.findOne({ where: { id: id } });
      //create transporter to send emails
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          //get the email and password from .env
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      //create mail settings
      let mailOptions = {
        from: "BanTexico",
        to: clientf.email,
        subject: "Token de acceso",
        text:
          "Hola " +
          clientf.name +
          " " +
          clientf.lastname +
          "\n" +
          "Tu token de acceso es: " +
          randnum,
      };
      //send mail

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          //if there are any error, send status ERROR (400)
          return res.status(ERROR).send(resError(error));
        }
        console.log("Email sent: " + info.response);
        //if there are no errors, send status OK (200)
        return res.status(OK).json(resOk('datos enviados al correo'));
      });
    } catch (err) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(err));
    }
  }
};
