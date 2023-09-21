"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuardMiddleware = void 0;
const utils_1 = require("../utils");
const expectAuthHeader = "admin:qwerty";
const authGuardMiddleware = function (req, res, next) {
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Basic ")) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        return;
    }
    const splitHeader = req.headers.authorization.split(" ")[1];
    const enCodeHeader = atob(splitHeader);
    if (enCodeHeader !== splitHeader) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
    }
    next();
};
exports.authGuardMiddleware = authGuardMiddleware;
