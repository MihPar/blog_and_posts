"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputPostsValueMiddleware = exports.blogId = exports.content = exports.shortDescriptionTitleValidation = exports.postTitleValidation = void 0;
const express_validator_1 = require("express-validator");
exports.postTitleValidation = (0, express_validator_1.body)('title').isString().isLength({ min: 1, max: 30 }).withMessage('Title should be length from 1 to 30 symbols');
exports.shortDescriptionTitleValidation = (0, express_validator_1.body)('shortDescription').isString().isLength({ min: 1, max: 100 }).withMessage('Short Description should be length from 1 to 100 symbols');
exports.content = (0, express_validator_1.body)('content').isLength({ min: 1, max: 1000 }).isString().withMessage('content should be length from 1 to 100 symbols');
exports.blogId = (0, express_validator_1.body)('blogId').isString();
const inputPostsValueMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.inputPostsValueMiddleware = inputPostsValueMiddleware;
