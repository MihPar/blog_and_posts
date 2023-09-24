"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = __importDefault(require("express"));
const posts_router_1 = require("./router/posts_router");
const blogs_router_1 = require("./router/blogs_router");
const deletedAllRouter_1 = require("./router/deletedAllRouter");
const app = (0, express_1.default)();
app.use((0, express_2.default)());
app.use('/posts', posts_router_1.postsRouter);
app.use('/blogs', blogs_router_1.blogsRouter);
app.use('/testing/all-data', deletedAllRouter_1.deletedAllRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { console.log(`Server was started at port ${PORT}`); });
