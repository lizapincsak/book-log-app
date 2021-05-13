
exports.seed = function(knex) {
  return knex('book_finished').del()
    .then(function () {
      return knex('book_finished').insert([
        {finished_reading: true, book_finished_month: 'March', book_finished_day: 11, book_finished_year: 2021 },
        {finished_reading: true, book_finished_month: 'March', book_finished_day: 17, book_finished_year: 2021 },
        {finished_reading: true, book_finished_month: 'February', book_finished_day: 26, book_finished_year: 2021 },

      ]);
    });
};
