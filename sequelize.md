## Create database banxico
## name of database must be in configure.json
sequelize db:create

## Models
sequelize model:create --name Branch --attributes name:string,address:string,ceo:string,description:string,security:string

sequelize model:create --name Area --attributes name:string

sequelize model:create --name Position --attributes name:string

sequelize model:create --name Executive --attributes name:string,lastname:string,userid:string,password:string,status:boolean,AreaId:integer,PositionId:integer,ExecutiveId:integer

sequelize model:create --name Client --attributes  name:string,lastname:string,gender:integer,street:string,number_ext:integer,colony:string,postalcode:integer,city:string,municipality:string,state:string,celphone:string,landline:string,curp:string,rfc:string,no_ine:string,email:string,BranchId:integer,ExecutiveId:integer

sequelize model:create --name Account --attributes type:boolean,amount:float,ExecutiveId:integer,ClientId:integer 

sequelize model:create --name Card --attributes card_number:string,nip:integer,expiration_date:date,ExecutiveId:integer,AccountId:integer

sequelize model:create --name Cashbox --attributes name:string

sequelize model:create --name Denomination --attributes name:string

sequelize model:create --name Commission --attributes name:string,amount:float

sequelize model:create --name Concept --attributes name:string

sequelize model:create --name Cut --attributes total:float,differences:float,type:boolean,CashboxId:integer,ExecutiveId:integer

sequelize model:create --name Transaction --attributes inicial_amount:float,final_amount:float,type:boolean,amount:float,ExecutiveId:integer,CommissionId:integer,ConceptId:integer 

sequelize model:create --name Beneficiary --attributes relation:string,percentage:integer,birth_date:date,phone:string,email:string,AccountId:integer

sequelize migration:create --name DenominationCut

## Seeders
sequelize seed:create --name Area
sequelize seed:create --name Position
sequelize seed:create --name Branch

