"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFormater = exports.ValueMiddleware = void 0;
const express_validator_1 = require("express-validator");
const ValueMiddleware = function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    // if (!errors.isEmpty()) {
    //   const errorMessage = errors.array({onlyFirstError: true}).map(errorFormater)
    //   res.status(HTTP_STATUS.BAD_REQUEST_400).send(errorMessage)
    //   return 
    // } else {
    //   next();
    // }
};
exports.ValueMiddleware = ValueMiddleware;
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
