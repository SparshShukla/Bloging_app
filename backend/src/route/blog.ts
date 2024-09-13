import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    // Bindings are used to define "type" of a particular environment variable in TS in Hono
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    authorId: any;
  };
}>();

//Middleware for all blog routes
blogRouter.use(async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET_KEY);
  if (!response) {
    c.status(401);
    return c.json({
      error: "Unauthorized",
    });
  }
  c.set("authorId", response.id);
  await next();
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const blog = prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: "1",
      },
    });
    return c.json({
      id: body.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "Error while uploading!! Try Again",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const blog = prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: body.id,
    });
  } catch (e) {
    c.status(404);
    return c.json({
      msg: "Error while updating",
    });
  }
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const blog = prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "Error while fetching",
    });
  }
});

// Apply "pagination" to give first 10 blogs and if user request then provide with other

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();
    return c.json({
      blogs,
    });
  } catch (e) {
    c.status(404);
    return c.text("Error while fetching");
  }
});
