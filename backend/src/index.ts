import { Hono } from "hono";
import { userRouter } from "./route/user";
import { blogRouter } from "./route/blog";
import { cors } from "hono/cors";
// hono-jwt for Jsonweb token authentication
// library to connect to connection pool rather then directly connecting to the dB

const app = new Hono<{
  Bindings: {
    // Bindings are used to define "type" of a particular environment variable in TS in Hono
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

// Middleware
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

// In Hono to access env variable we need to use c.env not just env
// And one impt thing env variable are accessed from wrangler.toml file not .env

export default app;
