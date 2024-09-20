import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@sparsh_shukla/medium-common";
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
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Invalid input",
    });
  }
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
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(401);
    return c.json({
      msg: "Invalid input",
    });
  }
  const check = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!check) {
    c.status(403);
    return c.json({
      msg: "User not found",
    });
  }
  const jwt_Token = await sign({ id: check.id }, c.env.JWT_SECRET_KEY);
  console.log(jwt_Token);
  return c.json(jwt_Token);
});
