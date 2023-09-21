"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const utils_1 = require("./../utils");
const posts_input_value_middleware_1 = require("../middleware/posts_input_value_middleware");
const posts_repositories_1 = require("./../repositories/posts_repositories");
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)({});
/************************************ get *********************************/
exports.postsRouter.get("/", function (req, res) {
    var _a;
    const result = posts_repositories_1.postsRepositories.findPosts((_a = req.body.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.status(200).send(result);
});
/************************************ post *********************************/
exports.postsRouter.post("/", posts_input_value_middleware_1.postTitleValidation, posts_input_value_middleware_1.shortDescriptionTitleValidation, posts_input_value_middleware_1.content, posts_input_value_middleware_1.blogId, posts_input_value_middleware_1.inputValueMiddleware, function (req, res) {
    const newPost = posts_repositories_1.postsRepositories.createPost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName);
    if (newPost) {
        res.status(201).send(newPost);
    }
    else {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400);
    }
});
/************************************ get{id} *********************************/
exports.postsRouter.get("/:id", posts_input_value_middleware_1.postTitleValidation, posts_input_value_middleware_1.shortDescriptionTitleValidation, posts_input_value_middleware_1.content, posts_input_value_middleware_1.blogId, posts_input_value_middleware_1.inputValueMiddleware, function (req, res) {
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
        const findNewPost = posts_repositories_1.postsRepositories.findPostId(req.params.id);
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
    res.status(utils_1.HTTP_STATUS.NO_CONTENT_204).send(deletedAllPosts);
});
