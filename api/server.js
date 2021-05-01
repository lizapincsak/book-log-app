const express = require('express');
const helment = require('helmet');
const cors = require('cors');

const server = express()
server.use(express.json())
server.use(helment())
server.use(cors())

module.exports = server