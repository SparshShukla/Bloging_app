import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogPost, updateBlogPost } from "@sparsh_shukla/medium-common";
import { number } from "zod";
export const blogRouter = new Hono<{
  Bindings: {
    // Bindings are used to define "type" of a particular environment variable in TS in Hono
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    // this is used to set a variable type which we will define later in the code so that TS does not recognize when it declared
    userId: number;
  };
}>();

//Middleware for all blog routes
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET_KEY);
  if (!response) {
    c.status(401);
    return c.json({
      error: "Unauthorized",
    });
  }
  c.set("userId", response.id as number);
  await next();
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogPost.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "Wrong input",
    });
  }
  const authorId = c.get("userId");
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  console.log(blog);
  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = updateBlogPost.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "Wrong input",
      });
    }
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

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json(blogs);
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const blog = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json(blog);
});

// Apply "pagination" to give first 10 blogs and if user request then provide with other
