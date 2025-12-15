import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { todoInsertSchema, todoTable } from "./db/schema";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
	return c.json({ result: "OK", ok: true });
});

app.get("/todos", async (c) => {
	const db = drizzle(c.env.DB);
	return c.json({ result: await db.select().from(todoTable).all(), ok: true });
});

app.post("/todos", zValidator("json", todoInsertSchema), async (c) => {
	const db = drizzle(c.env.DB);
	const parsed = c.req.valid("json");
	return c.json({
		result: await db
			.insert(todoTable)
			.values({ ...parsed })
			.returning(),
		ok: true,
	});
});

export default app;
