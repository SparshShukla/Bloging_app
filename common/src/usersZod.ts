import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBlogPost = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogPost = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

// type inference of zod to use in frontend check

export type createBlogPost = z.infer<typeof createBlogPost>;
export type upadteBlogPost = z.infer<typeof updateBlogPost>;

export type signupInput = z.infer<typeof signupInput>;
export type signinInput = z.infer<typeof signinInput>;

/*This file will be uploaded as node package on my account on npm to use them directly by importing as npm module rather than using
import export commands and relative paths such as "../../folder" to import something
because it make the file system bad

There is a better way to do this rather than deploying npm package by using monorepos*/
