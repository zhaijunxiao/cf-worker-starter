import { Context, Hono } from 'hono'
import { Environment } from '../bindings'
import { users } from './db/schemas/users'
import { drizzle } from 'drizzle-orm/d1'

const app = new Hono<Environment>()

app.get("/", async (c: Context<Environment>) => {
  return c.text("Hello Hono!");
});

app.get("/api/users", async (c: Context<Environment>) => {
  const db = drizzle(c.env.DB)
  const result = await db.select().from(users)
  return c.json(result);
});

export default app
