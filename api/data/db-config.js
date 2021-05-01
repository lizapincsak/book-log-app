const knex = require('knex');
const configs = require('../../knexfile')

module.expots = knex(configs[process.env.NODE_ENV])