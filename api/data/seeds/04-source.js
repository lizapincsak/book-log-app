
exports.seed = function(knex) {
  return knex('source').del()
    .then(function () {
      return knex('source').insert([
        {source_name: 'Book Riot'},
        {source_name: 'Kate Northrup'},
        {source_name: 'Brene Brown'},
      ]);
    });
};
