require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.DATABASE_DB,
    "host": process.env.HOST_DB,
    "port": process.env.PORT_DB,
    "dialect": process.env.DIALECT_DB,
    "seederStorage":process.env.SEEDER_STORAGE_DB,
    "seederStorageTableName":process.env.SEEDER_STORAGE_TABLE_DB
  },
}
