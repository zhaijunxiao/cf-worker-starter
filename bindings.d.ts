import { Env } from 'hono';
type Environment = Env & {
  Bindings: {
    DB: D1Database;
  };
};