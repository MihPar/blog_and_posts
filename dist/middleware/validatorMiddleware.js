"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueMiddleware = exports.errorFormater = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
// export type ValidationError = {
// 	type: any;
// 	msg: string;
// 	path: string;
//   };
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
const ValueMiddleware = function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array({ onlyFirstError: true }).map(item => {
            return (0, exports.errorFormater)(item);
        });
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).send({ errorsMessages });
        return;
    }
    else {
        next();
    }
};
exports.ValueMiddleware = ValueMiddleware;
