require("dotenv").config();
module.exports = {
  "production": {
    "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.DATABASE_DB,
    "host": process.env.HOST_DB,
    "port": process.env.PORT_DB,
    "dialectOptions": {
      ssl: {
        require: true,
        ca: fs.readFileSync(`${__dirname}/us-east-1-bundle.pem`),
      },
    },
    "seederStorage":process.env.SEEDER_STORAGE_DB,
    "seederStorageTableName":process.env.SEEDER_STORAGE_TABLE_DB,
  },
}
