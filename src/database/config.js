const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRESQL_DBHOST,
  port: 5432,
  username: process.env.POSTGRESQL_DBUSER,
  password: process.env.POSTGRESQL_DBPASSWORD,
  database: process.env.POSTGRESQL_DBNAME,
};
