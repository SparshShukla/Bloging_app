import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
export const userRouter = new Hono<{
  Bindings: {
    // Bindings are used to define "type" of a particular environment variable in TS in Hono
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const userId = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: userId }, c.env.JWT_SECRET_KEY);
    return c.json({
      msg: "user created",
      jwt: token,
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      msg: "Data invalid",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const check = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!check) {
    c.status(403);
    return c.json({
      msg: "Incorrect Credentials",
    });
  }
  const jwt_Token = await sign({ id: check.id }, c.env.JWT_SECRET_KEY);
  return c.json({
    jwt: jwt_Token,
  });
});
