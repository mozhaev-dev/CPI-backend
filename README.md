Create file .development.env for dev, or .env for prod environment.
Example:

POSTGRESQL_DBHOST="host.docker.internal"
POSTGRESQL_DBPORT=5432
POSTGRESQL_DBUSER=postgres
POSTGRESQL_DBPASSWORD=3442
POSTGRESQL_DBNAME=cpi

Notice: put "host.docker.internal" in POSTGRESQL_DBHOST, if you want to connect to localhost.

Build project:
docker-compose build dev
or
docker-compose build prod

Run project:
docker-compose up dev
or
docker-compose up prod
