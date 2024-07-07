import { todos } from '@/db/schema';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import type { Env } from './route';

export const todo = new Hono<Env>()
  .get('/', async (c) => {
    const results = await c.var.db.select().from(todos).all();
    return c.json(results);
  })
  .post(
    '/',
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
    '/:id',
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
  .delete('/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    const result = await c.var.db.delete(todos).where(eq(todos.id, id)).execute();
    return c.json(result);
  });
