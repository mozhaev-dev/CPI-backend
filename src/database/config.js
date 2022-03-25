require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRESQL_DBHOST,
  port: process.env.POSTGRESQL_DBPORT,
  username: process.env.POSTGRESQL_DBUSER,
  password: process.env.POSTGRESQL_DBPASSWORD,
  database: process.env.POSTGRESQL_DBNAME,
}