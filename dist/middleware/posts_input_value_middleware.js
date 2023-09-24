"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogId = exports.content = exports.shortDescriptionTitleValidation = exports.postTitleValidation = void 0;
const blogs_repositories_1 = require("./../repositories/blogs_repositories");
const express_validator_1 = require("express-validator");
exports.postTitleValidation = (0, express_validator_1.body)("title")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 30 })
    .withMessage("Title should be length from 1 to 30 symbols");
exports.shortDescriptionTitleValidation = (0, express_validator_1.body)("shortDescription")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 100 })
    .withMessage("Short Description should be length from 1 to 100 symbols");
exports.content = (0, express_validator_1.body)("content")
    .isLength({ min: 1, max: 1000 })
    .notEmpty()
    .trim()
    .isString()
    .withMessage("content should be length from 1 to 100 symbols");
exports.blogId = (0, express_validator_1.body)("blogId")
    .notEmpty()
    .isString()
    .trim()
    .custom((id) => {
    const blogIsExist = blogs_repositories_1.blogsRepositories.findBlogId(id);
    if (!blogIsExist) {
        throw new Error("Blog not exist");
    }
    return true;
})
    .withMessage("Invalid blogId");
