"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputBlogsWebsiteUrlValidation = exports.inputBlogsDescriptionValidation = exports.inputBlogsNameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.inputBlogsNameValidation = (0, express_validator_1.body)("name")
    .isString()
    .withMessage("1")
    .notEmpty()
    .withMessage("2")
    .trim()
    .withMessage("3")
    .isLength({ min: 1, max: 15 })
    .withMessage("Name should be length from 1 to 15 symbols");
exports.inputBlogsDescriptionValidation = (0, express_validator_1.body)("description")
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Descriptionme should be length from 1 to 15 symbols");
exports.inputBlogsWebsiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .isURL()
    .withMessage("Invalid websiteUrl");
