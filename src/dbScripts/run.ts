require('dotenv').config();
const Sequelize = require('sequelize');

async function run() {
  const sequelize = new Sequelize(
    process.env.POSTGRESQL_DBNAME,
    process.env.POSTGRESQL_DBUSER,
    process.env.POSTGRESQL_DBPASSWORD,
    {
      host: process.env.POSTGRESQL_DBHOST,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  );

  await sequelize.authenticate();

  const q = `
    CREATE TABLE IF NOT EXISTS public.operations
    (
        id integer NOT NULL DEFAULT nextval('operations_id_seq'::regclass),
        date timestamp with time zone NOT NULL,
        name text COLLATE pg_catalog."default" NOT NULL,
        location text COLLATE pg_catalog."default" NOT NULL,
        quantity integer NOT NULL,
        amount numeric NOT NULL,
        wallet character varying(255) COLLATE pg_catalog."default",
        "createdAt" timestamp with time zone,
        "updatedAt" timestamp with time zone,
        CONSTRAINT operations_pk PRIMARY KEY (id, date, name, location),
        CONSTRAINT operations_id_key UNIQUE (id)
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.operations
        OWNER to postgres;
  `;
  await sequelize.query(q);

  console.log('\nDONE!!!');

  sequelize.close();
}

run();
