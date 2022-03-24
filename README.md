Create file .development.env for dev, or .env for prod environment.
Example:

POSTGRESQL_DBHOST="host.docker.internal"
POSTGRESQL_DBPORT=5432
POSTGRESQL_DBUSER=postgres
POSTGRESQL_DBPASSWORD=3442
POSTGRESQL_DBNAME=cpi

Notice: put "host.docker.internal" in POSTGRESQL_DBHOST, if you want to connect to localhost.

Build for production:
1. Run
  docker-compose build
2. Run
  docker-compose up dev 
3. After building, stop container and run
  docker-compose up prod
