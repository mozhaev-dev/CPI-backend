Create file .development.env for development, or .env for production environment.
Example:

POSTGRESQL_DBHOST="host.docker.internal"
POSTGRESQL_DBPORT=5432
POSTGRESQL_DBUSER=postgres
POSTGRESQL_DBPASSWORD=3442
POSTGRESQL_DBNAME=cpi

DATA_FOR_SEO_API_URL="https://api.dataforseo.com/v3/serp/"
DATA_FOR_SEO_API_LOGIN="some@email.com"
DATA_FOR_SEO_API_PASSWORD="password"

Notice: put "host.docker.internal" in POSTGRESQL_DBHOST, if you want to connect to localhost.

Update and Build for production.

1. If you have allready runing containers, stop and delete it:
   `docker-compose down`

2. Pull code from the repository:
   `git pull`

3. Build and run dev container:
   `docker-compose build`
   `docker-compose up -d dev`

4. Run dev container's shell:
   `docker-compose exec dev sh`

5. Build an application:
   `npm run build`

6. Run migrations:
   `npx sequelize-cli db:migrate`

7. Exit from dev container's shell:
   `exit`

8. Stop dev container:
   `docker-compose stop dev`

9. Run prod server:
   `docker-compose up -d prod`
