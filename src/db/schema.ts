import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  text: text('text'),
  done: integer('done', { mode: 'boolean' }),
});
