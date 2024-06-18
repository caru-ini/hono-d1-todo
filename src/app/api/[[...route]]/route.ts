import { getRequestContext } from '@cloudflare/next-on-pages';
import { Hono } from 'hono';

export const runtime = 'edge';

type Bindings = {
  MY_DB: D1Database;
};

export const handle = (app: Hono<{ Bindings: Bindings }>) => (req: Request) => {
  const requestContext = getRequestContext();
  return app.fetch(req, requestContext.env, requestContext.ctx);
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// const routes = app
//   .get('/posts', async (c) => {
//     const db = drizzle(c.env.MY_DB);
//     const results = await db.select().from(posts).all();
//     return c.json(results);
//   })
//   .get('/tags', async (c) => {
//     const db = drizzle(c.env.MY_DB);
//     const results = await db.select().from(tags).all();
//     return c.json(results);
//   });
export type AppType = typeof routes;

export const GET = handle(app);
