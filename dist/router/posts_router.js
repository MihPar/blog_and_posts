"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const utils_1 = require("./../utils");
const posts_input_value_middleware_1 = require("../middleware/posts_input_value_middleware");
const posts_repositories_1 = require("./../repositories/posts_repositories");
const express_1 = require("express");
const db_posts_1 = require("../db/db_posts");
exports.postsRouter = (0, express_1.Router)({});
/************************************ get *********************************/
exports.postsRouter.get("/", function (req, res) {
    res.status(200).send(db_posts_1.posts);
});
/************************************ post *********************************/
exports.postsRouter.post("/", posts_input_value_middleware_1.postTitleValidation, posts_input_value_middleware_1.shortDescriptionTitleValidation, posts_input_value_middleware_1.content, posts_input_value_middleware_1.blogId, posts_input_value_middleware_1.inputPostsValueMiddleware, function (req, res) {
    const newPosts = posts_repositories_1.postsRepositories.createPost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName);
    if (newPosts) {
        res.status(utils_1.HTTP_STATUS.CREATED_201);
    }
    else {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400);
    }
});
/************************************ get{id} *********************************/
exports.postsRouter.get("/:id", posts_input_value_middleware_1.postTitleValidation, posts_input_value_middleware_1.shortDescriptionTitleValidation, posts_input_value_middleware_1.content, posts_input_value_middleware_1.blogId, posts_input_value_middleware_1.inputPostsValueMiddleware, function (req, res) {
    const post = posts_repositories_1.postsRepositories.findPostId(req.params.id);
    if (post) {
        res.status(utils_1.HTTP_STATUS.OK_200).send(post);
    }
    else {
        res.status(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
});
/************************************ put{id} *********************************/
exports.postsRouter.put("/:id", posts_input_value_middleware_1.postTitleValidation, posts_input_value_middleware_1.shortDescriptionTitleValidation, posts_input_value_middleware_1.content, posts_input_value_middleware_1.blogId, function (req, res) {
    const isUpdatePost = posts_repositories_1.postsRepositories.updatePostId(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (isUpdatePost) {
        const findPost = posts_repositories_1.postsRepositories.findPostId(req.params.id);
        res.status(utils_1.HTTP_STATUS.NO_CONTENT_204);
    }
    else {
        res.status(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
});
/************************************ delete{id} *********************************/
exports.postsRouter.delete('/:id', function (req, res) {
    const findPost = posts_repositories_1.postsRepositories.deletePost(req.params.id);
    if (findPost) {
        res.status(utils_1.HTTP_STATUS.NO_CONTENT_204);
    }
    else {
        res.status(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
});
exports.postsRouter.delete('/', function (req, res) {
    const deletedAllPosts = posts_repositories_1.postsRepositories.postsRepositories();
    res.status(utils_1.HTTP_STATUS.NO_CONTENT_204);
});
