"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = __importDefault(require("express"));
const posts_router_1 = require("./router/posts_router");
const blogs_router_1 = require("./router/blogs_router");
const deletedAllRouter_1 = require("./router/deletedAllRouter");
exports.app = (0, express_1.default)();
exports.app.use((0, express_2.default)());
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/blogs', deletedAllRouter_1.deletedAllRouter);
const PORT = process.env.PORT || 4000;
exports.app.listen(PORT, () => { console.log(`Server was started at port ${PORT}`); });
