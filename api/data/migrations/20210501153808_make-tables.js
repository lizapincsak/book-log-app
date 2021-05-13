
exports.up = async (knex) => {
    await knex.schema
      .createTable("users", (users) => {
        users.increments("user_id");
        users.string("username", 200).notNullable().unique();
        users.string("password", 200).notNullable();
        users.string("role", 200).notNullable();
        users.timestamps(false, true);
      })
      .createTable('genre', (tbl) => {
        tbl.increments('genre_id')
        tbl.string('genre_name', 200).notNullable()
      })
      .createTable('author', (tbl) => {
        tbl.increments('author_id')
        tbl.string('author_name', 200).notNullable()
        tbl.string('author_nationality', 200).notNullable()
        tbl.string('author_gender', 200).notNullable()
        tbl.string('author_race', 200).notNullable()
      })
      .createTable('source', (tbl) => {
        tbl.increments('source_id')
        tbl.string('source_name', 200).notNullable()
      })
      .createTable('book_started', (tbl) => {
        tbl.increments('book_started_id')
        tbl.boolean('started_reading').notNullable().defaultTo(false)
        tbl.string('book_started_month', 128).notNullable()
        tbl.integer('book_started_day').notNullable()
        tbl.integer('book_started_year').notNullable()
      })
      .createTable('book_finished', (tbl) => {
        tbl.increments('book_finished_id')
        tbl.boolean('finished_reading').notNullable().defaultTo(false)
        tbl.string('book_finished_month', 128).notNullable()
        tbl.integer('book_finished_day').notNullable()
        tbl.integer('book_finished_year').notNullable()
      })
      .createTable('book_log', (tbl) => {
        tbl.increments('book_log_id')
        tbl.string("book_title", 200).notNullable()
        tbl.integer("total_number_of_pages").notNullable()
        tbl.integer("genre_id")
          .unsigned()
          .references("genre_id")
          .inTable("genre")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl.integer("author_id")
          .unsigned()
          .references("author_id")
          .inTable("author")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl.integer("source_id")
          .unsigned()
          .references("source_id")
          .inTable("source")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl.integer("book_started_id")
          .unsigned()
          .references("book_started_id")
          .inTable("book_started")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      tbl.integer("book_finished_id")
          .unsigned()
          .references("book_finished_id")
          .inTable("book_finished")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      tbl.integer("users")
          .unsigned()
          .references("user_id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('book_log')
    await knex.schema.dropTableIfExists('book_finished')
    await knex.schema.dropTableIfExists('book_started')
    await knex.schema.dropTableIfExists('source')
    await knex.schema.dropTableIfExists('author')
    await knex.schema.dropTableIfExists('genre')
    await knex.schema.dropTableIfExists('users')
  }
  