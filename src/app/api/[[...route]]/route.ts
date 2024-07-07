import { todos } from '@/db/schema';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { handle as _handle } from 'hono/vercel';
import { z } from 'zod';

export const runtime = 'edge';

type Env = {
  Variables: {
    db: DrizzleD1Database;
  };
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
    }
  }
}

const app = new Hono<Env>().basePath('/api');

app.use(async (c, next) => {
  c.set('db', drizzle(process.env.DB));
  await next();
});

const routes = app
  .get('/todos', async (c) => {
    const results = await c.var.db.select().from(todos).all();
    return c.json(results);
  })
  .post(
    '/todos',
    zValidator(
      'json',
      z.object({
        text: z.string(),
      }),
    ),
    async (c) => {
      const params = await c.req.json<typeof todos.$inferSelect>();
      const result = await c.var.db.insert(todos).values(params).execute();
      return c.json(result);
    },
  )
  .put(
    '/todos/:id',
    zValidator(
      'json',
      z.object({
        text: z.string().optional(),
        done: z.boolean(),
      }),
    ),
    async (c) => {
      const id = parseInt(c.req.param('id'));
      const params = await c.req.json<typeof todos.$inferSelect>();
      const result = await c.var.db
        .update(todos)
        .set({ text: params.text, done: params.done })
        .where(eq(todos.id, id))
        .execute();
      return c.json(result);
    },
  )
  .delete('/todos/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    const result = await c.var.db.delete(todos).where(eq(todos.id, id)).execute();
    return c.json(result);
  });

export type AppType = typeof routes;

export const GET = _handle(app);

export const POST = _handle(app);

export const PUT = _handle(app);

export const DELETE = _handle(app);
