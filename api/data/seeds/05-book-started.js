
exports.seed = function(knex) {
  return knex('book_started').del()
    .then(function () {
      return knex('book_started').insert([
        {started_reading: true, book_started_month: 'March', book_started_day: 8, book_started_year: 2021 },
        {started_reading: true, book_started_month: 'March', book_started_day: 1, book_started_year: 2021 },
        {started_reading: true, book_started_month: 'February', book_started_day: 22, book_started_year: 2021 },
      ]);
    });
};
