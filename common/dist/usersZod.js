"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogPost = exports.createBlogPost = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    name: zod_1.default.string(),
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.createBlogPost = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogPost = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string(),
});
/*This file will be uploaded as node package on my account on npm to use them directly by importing as npm module rather than using
import export commands and relative paths such as "../../folder" to import something
because it make the file system bad

There is a better way to do this rather than deploying npm package by using monorepos*/
