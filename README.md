Create file .development.env for dev, or .env for prod environment.
Example:

POSTGRESQL_DBHOST="host.docker.internal"
POSTGRESQL_DBPORT=5432
POSTGRESQL_DBUSER=postgres
POSTGRESQL_DBPASSWORD=3442
POSTGRESQL_DBNAME=cpi

Notice: put "host.docker.internal" in POSTGRESQL_DBHOST, if you want to connect to localhost.

Build for production:

1. Build dev container, you should do it once.
   docker-compose build dev
2. Run build, you have to do it every time you pull new source code version.
   docker-compose run build
3. After building, you can run prod server.
   docker-compose up prod

If you need - run db scripts:
docker-compose up -d dev
docker-compose exec dev sh
node dist/dbScripts/run.js
exit
