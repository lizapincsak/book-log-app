require('dotenv').config()

const pg = require('pg')

if(process.env.DATABASE_URL){
  pg.defaults.ssl = {rejectUnauthorized: false}
}

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './api/data/migrations'},
  seeds: { directory: './api/data/seeds'},
}
module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "BookTrackerApp",
    }, 
    pool: {
      min: 2, 
      max: 10,
    },
    useNullAsDefault: true,
  },
  testing: {
    ...sharedConfig, 
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: {
      connection: process.env.DATABASE_URL,
      pool: {min: 2, max: 10}
    },
  }
};
