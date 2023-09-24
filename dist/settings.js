"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const express_1 = __importDefault(require("express"));
const posts_router_1 = require("./router/posts_router");
const blogs_router_1 = require("./router/blogs_router");
const deletedAllRouter_1 = require("./router/deletedAllRouter");
const startApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/posts', posts_router_1.postsRouter);
    app.use('/blogs', blogs_router_1.blogsRouter);
    app.use('/testing/all-data', deletedAllRouter_1.deletedAllRouter);
    return app;
};
exports.startApp = startApp;
