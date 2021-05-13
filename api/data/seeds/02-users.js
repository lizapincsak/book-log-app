const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          username: "Harry",
          password: bcrypt.hashSync("1234", 8),
          role: "Reader",
        },
        {
          username: "Hermione",
          password: bcrypt.hashSync("1234", 8),
          role: "reader",
        },
        {
          username: "Hagrid",
          password: bcrypt.hashSync("1234", 8),
          role: "admin",
        },
      ]);
    });
};