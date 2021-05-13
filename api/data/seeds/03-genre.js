exports.seed = function(knex) {
  return knex('genre').del()
    .then(function () {
      return knex('genre').insert([
        {genre_name: 'Mystery'},
        {genre_name: 'Feminism'},
        {genre_name: 'YA'}
      ]);
    });
};
