Install packages

npm i

create .development.env for dev or .production.env for prod environment. Example:

APP_PORT=7001
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=3442
POSTGRES_DB=cpi

Run project:
npm run start:dev - for development
npm run start - for production

All DB tables will be created automaticly
