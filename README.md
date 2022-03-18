Install packages

npm i

create .development.env for dev or .env for prod environment. Example:

LISTEN_PORT=7001
POSTGRESQL_DBHOST=localhost
POSTGRESQL_DBPORT=5432
POSTGRESQL_DBUSER=postgres
POSTGRESQL_DBPASSWORD=3442
POSTGRESQL_DBNAME=cpi

Run project:
npm run start:dev - for development

npm run build
npm run start:prod - for production

All DB tables will be created automaticly
