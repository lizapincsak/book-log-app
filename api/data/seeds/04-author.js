
exports.seed = function(knex) {
  return knex('author').del()
    .then(function () {
      return knex('author').insert([
        {author_name: "Catherine Adel West", author_nationality: 'American', author_gender: "Female", author_race: "POC"},
        {author_name: "Dr. Valerie Rein", author_nationality: 'Russian', author_gender: "Female", author_race: "White"},
        {author_name: "Elizabeth Avecedo", author_nationality: 'American', author_gender: "Female", author_race: "POC"},
      ]);
    });
};
