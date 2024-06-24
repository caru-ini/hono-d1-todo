import { todos } from '@/db/schema';
import { getRequestContext } from '@cloudflare/next-on-pages';
import assert from 'assert';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';

export const runtime = 'edge';

type Bindings = {
  DB: D1Database;
};

export const handle = (app: Hono<{ Bindings: Bindings }>) => (req: Request) => {
  const requestContext = getRequestContext();
  return app.fetch(req, requestContext.env, requestContext.ctx);
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

const routes = app
  .get('/todos', async (c) => {
    const db = drizzle(c.env.DB);
    const results = await db.select().from(todos).all();
    return c.json(results);
  })
  .post('/todos', async (c) => {
    const params = await c.req.json<typeof todos.$inferSelect>();
    const db = drizzle(c.env.DB);
    const result = await db.insert(todos).values(params).execute();
    return c.json(result);
  })
  .put('/todos/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    assert(!isNaN(id));
    const params = await c.req.json<typeof todos.$inferInsert>();
    const db = drizzle(c.env.DB);
    const result = await db
      .update(todos)
      .set({ text: params.text, done: params.done })
      .where(eq(todos.id, id))
      .execute();
    return c.json(result);
  })
  .delete('/todos/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    assert(!isNaN(id));
    const db = drizzle(c.env.DB);
    const result = await db.delete(todos).where(eq(todos.id, id)).execute();
    return c.json(result);
  });

export type AppType = typeof routes;

export const GET = handle(app);
