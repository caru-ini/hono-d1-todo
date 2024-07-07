import { handle as _handle } from 'hono/vercel';
import { app, routes } from './app';

export const runtime = 'edge';

export type AppType = typeof routes;

export const GET = _handle(app);

export const POST = _handle(app);

export const PUT = _handle(app);

export const DELETE = _handle(app);
