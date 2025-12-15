import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const todoTable = sqliteTable("todo", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	done: int({ mode: "boolean" }).notNull(),
});

export const todoInsertSchema = createInsertSchema(todoTable);
