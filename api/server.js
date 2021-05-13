const express = require('express');
const helment = require('helmet');
const cors = require('cors');

const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

const authRouter = require("./auth/auth-router")
const authorRouter = require("./author/author-router")
const finishedRouter = require("./book-finished/book-finished-router")
const startedRouter = require("./book-started/book-started-router")
const genreRouter = require("./genre/genre-router")
const sourceRouter = require("./source/source-router")
const usersRouter = require("./users/users-router")

const server = express()

server.use(express.json())
server.use(helment())
server.use(cors())

server.use("/api/auth", authRouter)
server.use("/api/author", authorRouter)
server.use("/api/finished", finishedRouter)
server.use("/api/started", startedRouter)
server.use("/api/genre", genreRouter)
server.use("/api/source", sourceRouter)
server.use("/api/users", usersRouter)

const sessionOptions = {
    name: "monkey",
    secret: "keep it secret, keep it safe!",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require("./data/db-config"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60,
    }),
  };
  server.use(session(sessionOptions));
  
  server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });
  
  module.exports = server;