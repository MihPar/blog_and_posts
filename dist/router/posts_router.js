"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const validatorMiddleware_1 = require("../middleware/validatorMiddleware");
const utils_1 = require("./../utils");
const posts_input_value_middleware_1 = require("../middleware/posts_input_value_middleware");
const posts_repositories_1 = require("./../repositories/posts_repositories");
const express_1 = require("express");
const db_posts_1 = require("../db/db_posts");
const authGuardMiddleware_1 = require("../middleware/authGuardMiddleware");
const db_blogs_1 = require("../db/db_blogs");
exports.postsRouter = (0, express_1.Router)({});
/************************************ get *********************************/
exports.postsRouter.get("/", function (req, res) {
    res.status(utils_1.HTTP_STATUS.OK_200).send(db_posts_1.posts);
});
/************************************ post *********************************/
exports.postsRouter.post("/", authGuardMiddleware_1.authGuardMiddleware, posts_input_value_middleware_1.postTitleValidation, posts_input_value_middleware_1.shortDescriptionTitleValidation, posts_input_value_middleware_1.content, posts_input_value_middleware_1.blogId, validatorMiddleware_1.ValueMiddleware, function (req, res) {
    let newPost;
    const blog = db_blogs_1.blogs.find((b) => b.id === req.params.id);
    if (blog) {
        newPost = posts_repositories_1.postsRepositories.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    }
    return res.status(utils_1.HTTP_STATUS.CREATED_201).send(newPost);
});
/************************************ get{id} *********************************/
exports.postsRouter.get("/:id", authGuardMiddleware_1.authGuardMiddleware, function (req, res) {
    const post = posts_repositories_1.postsRepositories.findPostId(req.params.id);
    if (!post) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
    else {
        res.status(utils_1.HTTP_STATUS.OK_200).send(post);
    }
});
/************************************ put{id} *********************************/
exports.postsRouter.put("/:id", authGuardMiddleware_1.authGuardMiddleware, posts_input_value_middleware_1.postTitleValidation, posts_input_value_middleware_1.shortDescriptionTitleValidation, posts_input_value_middleware_1.content, posts_input_value_middleware_1.blogId, validatorMiddleware_1.ValueMiddleware, function (req, res) {
    const isUpdatePost = posts_repositories_1.postsRepositories.updatePostId(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!isUpdatePost) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
    else {
        // const findPost = postsRepositories.findPostId(req.params.id)
        res.status(utils_1.HTTP_STATUS.NO_CONTENT_204).send('No content');
    }
});
/************************************ delete{id} *********************************/
exports.postsRouter.delete('/:id', authGuardMiddleware_1.authGuardMiddleware, function (req, res) {
    const findPost = posts_repositories_1.postsRepositories.deletePost(req.params.id);
    if (!findPost) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
    else {
        res.status(utils_1.HTTP_STATUS.NO_CONTENT_204);
    }
});
