const clients = require("../models").Client;
const beneficiaries = require("../models").Beneficiary;
const documents = require("../models").Document;
const accounts = require("../models").Account;
const cards = require("../models").Card;
const AccountCreditdetail = require("../models").AccountCreditdetail;
const Creditdetail = require("../models").Creditdetail;
const guarantees = require("../models").Guarantee;
const mortgages = require("../models").Mortgage;
const properties = require("../models").Property;

const { Op } = require("sequelize");

const { sequelize } = require("../models");

const { resOk, resError } = require("../helpers/responses");

const {
  OK,
  ERROR,
  UNAUTHORIZED,
  VALIDATION,
  NOT_FOUND,
} = require("../helpers/status");

function createNoCard(){
  rand_3 = Math.ceil(Math.random() * (999 - 100) + 100).toString(),
  date_13 = Date.now().toString();
  let no_card = rand_3 + date_13;
  return no_card;
}

function createExpDate() {
  const exp_date = new Date();
  exp_date.setFullYear(exp_date.getFullYear() + 3);
  return exp_date;
  
}

function createNoAcc() {
  let no_acc = Date.now().toString();
  return no_acc;
}

module.exports = {
  async index(req, res) {
    try {
      //findAll with the registers asociated in the table roomEquipments
      let data = await clients.findAll({
        attributes: ["id", "name", "lastname", "curp"],
        
        include: [
          {
            attributes: ["no_acc", "type", "amount"],
            model: accounts
          }
        ],
      });
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },

  async show(req, res) {
    try {
      //findOne with the register asociated in the table roomEquipments
      let data = await clients.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: accounts,
            include: [
              { model: beneficiaries },
              { model: cards },
              { model: Creditdetail },
                {
                  model: mortgages,
                  include: [
                    { model: guarantees, 
                      include: [{ model: properties }]
                    },
                  ],
                },
            ],
          },
          { model: documents },
        ],
      });
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },
  //get all clients like name or lastname
  async search(req, res) {
    try {
      //findAll with the registers asociated in the table roomEquipments
      let data = await clients.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${req.body.name}%`,
              },
            },
            {
              lastname: {
                [Op.like]: `%${req.body.lastname}%`,
              },
            },
          ],
        },
        attributes: ["id", "name", "lastname", "curp"],

        include: [
          {
            attributes: ["no_acc", "type", "amount"],
            model: accounts,
          },
        ],
      });
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },

  async createDebito(req, res) {
    try {
      //iniciar transaccion
      const result = await sequelize.transaction(async (t) => {
        const arrayBeneficiaries = req.body.beneficiaries;
        const arrayDocuments = req.body.documents;

        const client = await clients.create(req.body.client, {
          transaction: t,
        });
        const account = await accounts.create(
          {
            ...req.body.account,
            type: "debit",
            ClientId: client.id,
            ExecutiveId: req.session.id,
            no_acc: createNoAcc(),
          },
          { transaction: t }
        );
        
        const beneficiary = await arrayBeneficiaries.forEach((element) => {
          beneficiaries.create(
            { ...element, AccountId: account.id },
            { transaction: t }
          );
          
        });
        
        const document = await arrayDocuments.forEach((element) => {
          documents.create(
            { ...element,ClientId:client.id},
            { transaction: t }
          );
        });
        
        const card = await cards.create(
          {
            ...req.body.card,
            AccountId: account.id,
            ExecutiveId: req.session.id,
            card_number: createNoCard(),
            expiration_date: createExpDate(),
          },
          { transaction: t }
        );
        
        return res.status(OK).json(resOk("client created"));
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async createCredito(req, res) {
    try {
      //iniciar transaccion
      const result = await sequelize.transaction(async (t) => {
        const arrayDocuments = req.body.documents;

        const client = await clients.create(req.body.client, {
          transaction: t,
        });
        const account = await accounts.create(
          {
            ...req.body.account,
            type: "credit",
            ClientId: client.id,
            ExecutiveId: req.session.id,
            no_acc:createNoAcc(),
          },
          { transaction: t }
        );
        console.log(account.id);
        console.log(req.body.creditdetail);
        const creditdetail = await AccountCreditdetail.create(
          { ...req.body.creditdetail, AccountId: account.id },
          { transaction: t }
        );
        const document = await arrayDocuments.forEach((element) => {
          documents.create(
            { ...element, ClientId: client.id },
            { transaction: t }
          );
        });
        const card = await cards.create(
          {
            AccountId: account.id,
            ExecutiveId: req.session.id,
            card_number: createNoCard(),
            expiration_date: createExpDate(),
          },
          { transaction: t }
        );
        return res.status(OK).json(resOk("client created"));
      });
    } catch (error) {
      console.log(error);
      return res.status(ERROR).json(resError(error));
    }
  },

  async createMorgages(req, res) {
    try {
      //iniciar transaccion
      const result = await sequelize.transaction(async (t) => {
        const arrayDocuments = req.body.documents;
        const arrayGuarantees = req.body.guarantees;
        const arrayProperties = req.body.properties;

        const client = await clients.create(req.body.client, {
          transaction: t,
        });
        const account = await accounts.create(
          {
            ...req.body.account,
            type: "mortgage",
            ClientId: client.id,
            ExecutiveId: req.session.id,
            no_acc: createNoAcc(),
          },
          { transaction: t }
        );
        const document = await arrayDocuments.forEach((element) => {
          documents.create(
            { ...element, ClientId: client.id },
            { transaction: t }
          ); 
        });
        const mortgage = await mortgages.create(
          { ...req.body.mortgage, AccountId: account.id },
          { transaction: t }
        );
        let i=0;
        await arrayGuarantees.forEach(async (element) => {
          const aux=await guarantees.create(
            { ...element, MortgageId: mortgage.id },
            { transaction: t }
          );
          const pro = await properties.create(
            { ...arrayProperties[i], GuaranteeId: aux.id },
            { transaction: t }
          );
          i++;
        });
        const card = await cards.create(
          {
            AccountId: account.id,
            ExecutiveId: req.session.id,
            card_number: createNoCard(),
            expiration_date: createExpDate(),
          },
          { transaction: t }
        );
        
        return res.status(OK).json(resOk("client created"));
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async update(req, res) {
    try {
      //update the client with the id
      let data = await clients.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      console.log(data);
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },
  // do a logical delete of the client with the id
  async destroy(req, res) {
    try {
      //soft delete the client with the id
      let data = await clients.destroy(
        {where: {id: req.params.id},returning:true,plain:true}
      );
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },
};
