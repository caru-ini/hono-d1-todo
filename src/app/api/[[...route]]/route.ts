import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { handle as _handle } from 'hono/vercel';
import { todo } from './todo';

export const runtime = 'edge';

export type Env = {
  Variables: {
    db: DrizzleD1Database;
  };
  Bindings: {
    DB: D1Database;
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
  c.set('db', drizzle(process.env.DB || c.env.DB));
  await next();
});

export const routes = app.route('/todos', todo);

export type AppType = typeof routes;

export const GET = _handle(app);

export const POST = _handle(app);

export const PUT = _handle(app);

export const DELETE = _handle(app);
