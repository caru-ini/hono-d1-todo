import { routes } from '@/app/api/[[...route]]/route';
import { env } from 'cloudflare:test';
import { testClient } from 'hono/testing';

describe('Test API', () => {
  const client = testClient(routes, env);

  it('Post /api/todos', async () => {
    const res = await client.api.todos.$post({ json: { text: 'test' } }).then((res) => res.json());
    expect(res).toEqual({ text: 'test' });
  });

  it('Put /api/todos/:id', async () => {
    const res = await client.api.todos[':id']
      .$put({ param: { id: '1' }, json: { done: true } })
      .then((res) => res.json());
    expect(res).toEqual({ done: true });
  });

  it('Get /api/todos', async () => {
    const res = await client.api.todos.$get().then((res) => res.json());
    expect(res).toHaveLength;
  });

  it('Delete /api/todos/:id', async () => {
    const res = await client.api.todos[':id']
      .$delete({ param: { id: '1' } })
      .then((res) => res.json());
    expect(res).toEqual({});
  });
});
