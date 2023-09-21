"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const validatorMiddleware_1 = require("../middleware/validatorMiddleware");
const utils_1 = require("./../utils");
const express_1 = require("express");
const db_blogs_1 = require("../db/db_blogs");
const blogs_repositories_1 = require("../repositories/blogs_repositories");
const blogs_input_value_middleware_1 = require("../middleware/blogs_input_value_middleware");
const authGuardMiddleware_1 = require("../middleware/authGuardMiddleware");
exports.blogsRouter = (0, express_1.Router)({});
/************************************ get ***************************/
exports.blogsRouter.get("/", function (req, res) {
    res.status(200).send(db_blogs_1.blogs);
});
/************************************ post ***************************/
exports.blogsRouter.post("/", authGuardMiddleware_1.authGuardMiddleware, blogs_input_value_middleware_1.inputBlogsNameValidation, blogs_input_value_middleware_1.inputBlogsDescriptionValidation, blogs_input_value_middleware_1.inputBlogsWebsiteUrlValidation, validatorMiddleware_1.ValueMiddleware, function (req, res) {
    const newBlogs = blogs_repositories_1.blogsRepositories.createNewBlogs(req.body.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!newBlogs) {
        res.sendStatus(utils_1.HTTP_STATUS.BAD_REQUEST_400);
    }
    else {
        res.sendStatus(utils_1.HTTP_STATUS.CREATED_201);
    }
});
/************************************ get{id} ***************************/
exports.blogsRouter.get("/:id", function (req, res) {
    const blog = blogs_repositories_1.blogsRepositories.findBlogsId(req.params.id);
    if (!blog) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
    else {
        res.status(utils_1.HTTP_STATUS.OK_200).send(blog);
    }
});
/************************************ put{id} ***************************/
exports.blogsRouter.put("/:id/", authGuardMiddleware_1.authGuardMiddleware, blogs_input_value_middleware_1.inputBlogsNameValidation, blogs_input_value_middleware_1.inputBlogsDescriptionValidation, blogs_input_value_middleware_1.inputBlogsWebsiteUrlValidation, validatorMiddleware_1.ValueMiddleware, function (req, res) {
    const isUpdateBlog = blogs_repositories_1.blogsRepositories.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!isUpdateBlog) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
    else {
        const findBlog = blogs_repositories_1.blogsRepositories.findBlogsId(req.params.id);
        res.status(utils_1.HTTP_STATUS.NO_CONTENT_204).send("No content");
    }
});
exports.blogsRouter.delete("/:id", function (req, res) {
    const findBlog = blogs_repositories_1.blogsRepositories.deletedBlogsId(req.params.id);
    if (!findBlog) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }
    else {
        res.status(utils_1.HTTP_STATUS.NO_CONTENT_204).send("No content");
    }
});
