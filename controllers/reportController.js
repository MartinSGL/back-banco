//model required
const account = require("../models").Account;
const transaction = require("../models").Transaction;
const concept = require("../models").Concept;
const card = require("../models").Card;
const client = require("../models").Client;
const commission = require("../models").Commission;
const mortgage = require("../models").Mortgage;
const creditdetail = require("../models").Creditdetail;
const interest = require("../models").Interest;
const Replacements = require("../models").Replacement;
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
const { autoTable } = require("jspdf-autotable");
const pdfmailer = require("../helpers/pdfmailer");
const mailer = require("../helpers/mailer");
//import moment
const moment = require("moment");

//Bank Logo
const imagedata="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADyElEQVR4nO2ayWsUQRSHq8XEBOLFoxq8KC7RKIJxx0SIenD5LwQFETyIR28uRDFxCejNowgeFEE8aBK9a9xAFFcQ8SAmY5ZD/Dz0a6ZsM5Pqnlo6Oh8MyVS9V/2r1/VeV/e0UoEAuoFnwDDQHUqHd4CFwHX+5jawJLQ+ZwCNwAmgJBMeBY7LZ1TaSmLTGFqvVYAu4Hmlsz3NqngN7Amp2QpZJwZ0VgvUrAFoAI4CIzKRn8BJYJ5L30Iw03LPMM7sSgtXggufFj6WbGHTwtZyz3C8YqRFaCHB0qJIS9GWlijjQQeVUtszKfXPYBRFO0yN52QcfDKjfQj8aUwS0LTftX0esq6Af465NgbJehZc22eh1hXwyMBmyKN9GHznuo3cT/jva0A9AKEFhKYegNACQlMPQGgBoakpAMDjatdn+Trkyz4PmW6H05huRqIoinzY58HKvUAlAZUm4No+C/UakMepUm6mSfc7ts9VC3Lljo2l54I8taCmGlBL8bFJLSekXgNMDZO8N8lNjQlgX2qcduAy8Ir4fYAx+f8i0J6yPQBMznSQafTYf0hiMNlKAdgr/k3AVeBXFfspoB95tg/slzEy4ywAOX2bgQEZYhzoBTqAFunbAJyXPoAH5PyxpagBuCbun4F1Wvtj/tz6tgEfxPaKb51GAxtSAraI33riZT8BrNXGO6zZHwGS7e9q4rowldgD24h/+jLGRQCGcgagX9r6tLE28nct2Kn1n9N9gK2UX64yYdB6APICvBRRG7W2g9L2ENgHnAFatP710v8ijGqLUK7i+gSXUS54b4FdKZ8m6Rv3r9gy2kRbUu27gTfSNwYs1frmSYqUXOvzsRN8J3/bkgagWSnVqZQ6ppQaUEo1K6W6NJ82Fd+nvPegzy3AFb2gSduOVNH6BXRo/eel/WIY1RYB1lC+DK6Ttoj40pdwKGU/IT6rwim3CHBJJpreCD0CBrTv7cBHse0No9YBxNvd+zKxSQnIZmA+8XZ4E/H2OLli3AOaQuu2igShj5lvhi78c5PXAVbK2R7WJv5UJr4itD6vJLMPqaH+RCi0gNBYDQDQCtyk/PZmVTQ/E0aAW8Bym5qtPdUFWpVST5RSC2yNWYHvSqm1URR9cnycbMiZB7gDLDL0MS6CwGLgrrjcqE2tA7RlvziDT6argKQYwI98Kh2S55Lmy6caNRdB4tfWz2jfTwNVf3Hy5eMF4sdZaU4VwccLwFcRs4H46S3AlyL4mGBzHzBHlS+rpuP68nEH0DPN0jxbBB8vEBenc8A3+fQADUXwMeE3iItthPC6xpsAAAAASUVORK5CYII="
      



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
      doc.addImage(imagedata,'PNG', 10,0,20,20, 'bancomex');
      doc.setTextColor("#4287f5");
      doc.text("BancoMex",30,15);
      doc.setTextColor(0,0,0);
      doc.text("Account Status", 90,20);
      let { name, lastname, rfc } = data[0];

      doc.autoTable({
        margin:{ top: 30 },
        head: [["Name", "Last Name", "RFC"]],
        body: [[name, lastname, rfc]],
      });

      data[0].Accounts.forEach((element) => {
        doc.autoTable({
          head: [["Account Number", "Account Type", "Balance"]],
          body: [[element.no_acc, element.type, element.amount]],
        });
        element.Cards.forEach((element2) => {
          let cardnumber = element2.card_number;
          let array = [];
          element2.Transactions.forEach((element3) => {
            array.push(
              cardnumber,
              element3.amount,
              element3.Commission.amount,
              element3.Concept.name,
              element3.date
            );
          });
          if (array.length > 1) {
            doc.autoTable({
              head: [
                ["Card Number", "Amount", "Commission", "Concept", "Date"],
              ],
              body: [array],
            });
          } else {
            doc.text(
              20,
              doc.lastAutoTable.finalY + 10,
              "No Transactions found on this account"
            );
          }
        });
      });

      var file = doc.output("datauristring");
      //send message to the client giving them a greeting and the pdf
      let mailerOptions = {
        emailC: data[0].email,
        subjectC: "Account Status",
        textC:
          "Hello " +
          data[0].name +
          " " +
          data[0].lastname +
          "," +
          " your account status is attached",
        doc: file,
        filename: "accountStatus.pdf",
      };

      pdfmailer(mailerOptions);
      return res.status(OK).json(resOk("Todo Bien", data[0]));
    } catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(error));
    }
  },
  // send nip to the clients email
  async sendData(req, res) {
    try {
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
      
      doc.addImage(imagedata,'PNG', 10,0,20,20, 'bancomex');
      doc.setTextColor("#4287f5");
      doc.text("BancoMex",30,15);
      doc.setTextColor(0,0,0);
      doc.text("Account Info", 90,20);
      let { name, lastname, rfc } = accounts.Client;

      doc.autoTable({
        margin:{ top: 30 },
        head: [["Name", "Last Name", "RFC"]],
        body: [[name, lastname, rfc]],
      });

      let { no_acc, type, amount } = accounts;
      doc.autoTable({
        head: [["Account Number", "Account Type", "Balance"]],
        body: [[no_acc, type, amount]],
      });
      let { card_number, nip } = accounts.Cards[0];
      doc.autoTable({
        head: [["Card Number", "NIP"]],
        body: [[card_number, nip]],
      });
      var file = doc.output("datauristring");

      let mailerOptions = {
        emailC: accounts.Client.email,
        subjectC: "Account Information",
        textC:
          "Hello " +
          accounts.Client.name +
          " " +
          accounts.Client.lastname +
          ",",
        doc: file,
        filename: "AccountInfo.pdf",
      };

      pdfmailer(mailerOptions);

      return res.status(OK).json(resOk("Data sended"));
    } catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(error));
    }
  },

  async sendTable(req, res) {
    try {
    } catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(ERROR).send(resError(error));
    }
  },

  async getRepositionsByDay(req, res) {
    try {
      const today = new Date();
      const repositions = await Replacements.findAll({
        where: {
          createdAt: {
            [Op.between]: [
              today.setHours(0, 0, 0, 0),
              today.setHours(23, 59, 59, 999),
            ],
          },
        },
      });
      return res.status(OK).json(resOk(repositions.length));
    } catch (error) {
      return res.status(ERROR).send(resError(error));
    }
  },

  async getdebtors (req, res) {
    //obtain the numbre of accounts of type credit and mortgage separated with amount more than 0
    try {
      const accounts = await account.findAll({
        where: {
          type: {
            [Op.or]: ["credit", "mortgage"],
          },
          amount: {
            [Op.gt]: 0,
          },
        },
        group: ["type","id"],
      });
      //seperate the accounts by type
      let cred = [];
      let mor = [];
      accounts.forEach(async (element) => {
        if (element.type == "credit") {
          cred.push(element);
        } else if (element.type == "mortgage") {
          mor.push(element);
        }
      });
      
      return res.status(OK).json(resOk([cred.length,mor.length]));
    } catch (error) {
      return res.status(ERROR).send(resError(error));
    }
  
  },

  async amortization (req, res) {
    try{
      //obtain id from paramas
      const id = req.params.id;
      //find the account by id
      const accounts = await account.findOne({
        where: {
          id: id,
        },
        include: [
          { model: creditdetail },
          {
            model: mortgage,
            include: [{ model: interest }],
          },
          {model: client}
        ],
      });

      if (!accounts) {
        return res.status(NOT_FOUND).send(resError("Not registers found"));
      }
      //return the account
      let data=[]
      //check if type is credit
      if (accounts.type === "credit") {
        //get debt terms from creditdetail in account
        const debtTerm = accounts.Creditdetails[0].debterms;
        //get the interest rate from creditdetail in account
        const interest = accounts.Creditdetails[0].interest;
        //get createdAt from account
        const createdAt = accounts.createdAt;

        // get amount from account
        let amount = accounts.amount;

        //divide amount by debtterms
        let amort = amount / debtTerm;

        let interestAmount=0;

        let total=0;
        let period = 0;
        let commissionf = 0;
        //set date to createdAt and use dd-mm-yyyy format
        let date = moment(createdAt).format("DD-MM-YYYY");

        for (let i = 0; i < debtTerm; i++) {
          
          //multiply by interest rate
          interestAmount = amount * interest;
          total = interestAmount + amort;
          total= total + (total * 0.01);
          amount = amount - amort;

          commissionf = total * 0.01;
          //add all to data
          period = i + 1;
          
          date = moment(date, "DD-MM-YYYY").add(1, "month").endOf("month").format("DD-MM-YYYY");

          //add to data and round to 2 decimals

          data.push([date, interestAmount.toFixed(2), amort.toFixed(2), commissionf.toFixed(2), Math.ceil(total), Math.ceil(amount)]);

        }
        
      } else if (accounts.type === "mortgage") {
        //get debt terms from interest 
        const debtTerm = accounts.Mortgage.Interest.debterms;
        //get the interest rate from interest
        const interest = accounts.Mortgage.Interest.interest;
        //get createdAt from account
        const createdAt = accounts.createdAt;
        
        // get amount from account
        let amount = accounts.amount;
        
        //divide amount by debtterms
        let amort = amount / debtTerm;
        let interestAmount=0;
        let total=0;
        let period = 0;
        let commissionf = 0;
        //set date to createdAt and use dd-mm-yyyy format
        let date = moment(createdAt).format("DD-MM-YYYY");

        for (let i = 0; i < debtTerm; i++) {
          //multiply by interest rate
          interestAmount = amount * interest;
          total = interestAmount + amort;
          total= total + (total * 0.01);
          amount = amount - amort;

          commissionf = total * 0.01;
          //add all to data
          period = i + 1;
          

          date = moment(date, "DD-MM-YYYY").add(1, "month").endOf("month").format("DD-MM-YYYY");

          //add to data and round to 2 decimals

          data.push([date, interestAmount.toFixed(2), amort.toFixed(2), commissionf.toFixed(2), Math.ceil(total), Math.ceil(amount)]);
          
          
        }
      }
      else{
        return res.status(NOT_FOUND).send(resError("Account type no valid"));
      }
      
      //make a pdf table with the data
      const doc = new jsPDF();

      //Add title to pdf that reads "Amortization" and the name od the bank"BancoMex"
      doc.addImage(imagedata,'PNG', 10,0,20,20, 'bancomex');
      doc.setTextColor("#4287f5");
      doc.text("BancoMex",30,15);
      doc.setTextColor(0,0,0);
      doc.text("Amortization", 90,20);
      doc.setFontSize(10);
      doc.text("Client: "+accounts.Client.name+" "+accounts.Client.lastname, 150,10);
      doc.text("Account: "+accounts.no_acc, 150,15);
      doc.text("Type: "+accounts.type, 150,20);
  
      //add the table to the pdf at the end of the last line
      doc.autoTable({
        margin: { top: 30 },
        head: [["Date", "Interests", "Amortization","Commission", "Total" ,"Amount"]],
        body: data,
      });

      var file = doc.output("datauristring");
      //send the pdf to the client
      let mailerOptions = {
        emailC: accounts.Client.email,
        subjectC: "Amortization",
        textC:
          "Hello " +
          accounts.Client.name +
          " " +
          accounts.Client.lastname +
          ",",
        doc: file,
        filename: "Amortization.pdf",
      };
      pdfmailer(mailerOptions);

      

      return res.status(OK).json(resOk(accounts));


    } catch (error) {
      return res.status(ERROR).send(resError(error));
    }
  },

};
