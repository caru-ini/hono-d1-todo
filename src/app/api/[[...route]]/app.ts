import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { todo } from './todo';

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

export const app = new Hono<Env>().basePath('/api');

app.use(async (c, next) => {
  c.set('db', drizzle(process.env.DB || c.env.DB));
  await next();
});

export const routes = app.route('/todos', todo);
