"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFormater = exports.inputBlogsValueMiddleware = exports.inputBlogsWebsiteUrlValidation = exports.inputBlogsDescriptionValidation = exports.inputBlogsNameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.inputBlogsNameValidation = (0, express_validator_1.body)("name")
    .isString()
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("Name should be length from 1 to 15 symbols");
exports.inputBlogsDescriptionValidation = (0, express_validator_1.body)("description")
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Descriptionme should be length from 1 to 15 symbols");
exports.inputBlogsWebsiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches("^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$")
    .withMessage("Invalid websiteUrl");
const inputBlogsValueMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.inputBlogsValueMiddleware = inputBlogsValueMiddleware;
const errorFormater = (error) => {
    switch (error.type) {
        case "field":
            return {
                message: error.msg,
                filed: error.path,
            };
            break;
        default:
            return {
                message: error.msg,
                filed: "None",
            };
    }
};
exports.errorFormater = errorFormater;
