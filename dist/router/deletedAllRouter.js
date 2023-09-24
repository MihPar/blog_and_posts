"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedAllRouter = void 0;
const express_1 = require("express");
const posts_repositories_1 = require("../repositories/posts_repositories");
const blogs_repositories_1 = require("../repositories/blogs_repositories");
const utils_1 = require("../utils");
exports.deletedAllRouter = (0, express_1.Router)({});
exports.deletedAllRouter.delete('/', function (req, res) {
    posts_repositories_1.postsRepositories.deletedPosts();
    blogs_repositories_1.blogsRepositories.deletedBlogs();
    return res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
});
