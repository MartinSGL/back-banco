//model required
const account = require("../models").Account;
const transaction = require("../models").Transaction;
const concept = require("../models").Concept;
const card = require("../models").Card;
const client = require("../models").Client;
const commission = require("../models").Commission;
//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
const { resOk, resError } = require("../helpers/responses");
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {
  OK,
  ERROR,
  UNAUTHORIZED,
  VALIDATION,
  NOT_FOUND,
} = require("../helpers/status");
const { sequelize } = require("../models");

//mailer helper for messages and responses
const { Op } = require("sequelize");

const modelName = "Position";
const { jsPDF } = require("jspdf"); // will automatically load the node version
const {autoTable} = require( 'jspdf-autotable')
const pdfmailer = require("../helpers/pdfmailer")
const mailer = require("../helpers/mailer")



module.exports = {
  async getAccounts(req, res) {
    try {
      let date = new Date();
      let data = await account.count({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("date", sequelize.col("createdAt")),
              "=",
              date
            ),
          ],
        },
        attributes: ["type"],
        group: "type",
      });

      return res.status(OK).json(resOk(data));
    } catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(error));
    }
  },
  async getTransactions(req, res) {
    try {
      let date = new Date();
      let data = await transaction.count({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("date", sequelize.col("date")),
              "=",
              date
            ),
          ],
        },
        include: [{ model: concept }],
        attributes: ["ConceptId"],
        group: "ConceptId",
      });
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(error));
    }
  },

  async accountStatus(req, res) {
    try {
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
    
        //get all clients and transaction from the last month
        //transaction is related to card
        //card is related to account
        //account is related to client
        const dataCard = await card.findAll();
        
        const data = await client.findAll({
          where: {
            id: req.params.id,
          },
          include: [
            {
              model: account,
              include: [
                {
                  model: card,
                  include: [
                    {
                      model: transaction,
                      include: [{ model: commission }, { model: concept }],
                      
                    },
                  ],
                },
              ],
            },
          ],
        });

        if (!data) {
          return res.status(NOT_FOUND).send(resError("Not registers found"));
        }
        
        const doc = new jsPDF();
        //console.log(data[0].Accounts[0].Cards[0].Transactions[0].Concept.amount);
        let {name, lastname,rfc} = data[0];

        
        doc.autoTable({
          head: [['Name', 'Last Name', 'RFC']],
          body: [[name,lastname,rfc]],
        })

        data[0].Accounts.forEach(element => {
            doc.autoTable({
              head: [["Account Number", "Account Type", "Balance"]],
              body: [[element.no_acc, element.type, element.amount]],
            });
            element.Cards.forEach(element2 =>{
                let cardnumber = element2.card_number
                console.log(cardnumber)
                let array =[]
                element2.Transactions.forEach(element3=>{
                  console.log(element3)
                    array.push(cardnumber,element3.amount,element3.Commission.amount,element3.Concept.name,element3.date)
                  
                })
                doc.autoTable({
                  head:[['Card Number','Amount','Commission','Concept','Date']],
                  body:[array]
              })

            })
            
            
        });
        


        
       


        var file = doc.output('datauristring');
        // var fd = new FormData();     // To carry on your data  
        // fd.append('mypdf',file);

        //send message to the client giving them a greeting and the pdf 
        let mailerOptions = {
          emailC: data[0].email,
          subjectC: "Account Status",
          textC:  "Hello " + data[0].name + " " + data[0].lastname + "," + " your account status is attached",
          doc: file,
          filename:'accountStatus.pdf'
        };
        
        pdfmailer( mailerOptions);
        console.log(data[0].Accounts[0])
      return res.status(OK).json(resOk("Todo Bien",data[0]));
    } catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(error));
    }
  },
  // send nip to the clients email
  async sendData(req, res) {
    try{
      // obtain the id of the account from the url
      let id = req.params.id;
      //obtain the card from the account and the client
      let accounts = await account.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: card,
          },
          {
            model: client,
          },
        ],
      });
        
       if (!accounts) {
         return res.status(NOT_FOUND).send(resError("Not registers found"));
       }
        
        const doc = new jsPDF();
        //console.log(data[0].Accounts[0].Cards[0].Transactions[0].Concept.amount);
        let {name, lastname,rfc} = accounts.Client;

        doc.autoTable({
          head: [['Name', 'Last Name', 'RFC']],
          body: [[name,lastname,rfc]],
        })

        let {no_acc, type, amount } = accounts;
        doc.autoTable({
          head: [["Account Number", "Account Type", "Balance"]],
          body: [[no_acc, type, amount]],
        });
        let {card_number, nip } = accounts.Cards[0];
        doc.autoTable({
          head:[['Card Number', 'NIP']],
          body: [[card_number, nip]],
        })
        var file = doc.output('datauristring');

      let mailerOptions= {
        emailC: accounts.Client.email,
        subjectC: "Account Information",
        textC:  "Hello " + accounts.Client.name + " " + accounts.Client.lastname + ",",
        doc: file,
        filename:'AccountInfo.pdf'
      };
      
      pdfmailer( mailerOptions);

      return res.status(OK).json(resOk("Data sended"));
    }catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(error));
    }
    },
};
