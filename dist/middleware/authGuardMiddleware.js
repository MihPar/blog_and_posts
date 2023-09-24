"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuardMiddleware = void 0;
const utils_1 = require("../utils");
const console_1 = require("console");
const expectAuthHeader = "admin:qwerty";
const encodedData = Buffer.from(expectAuthHeader).toString('base64');
const authGuardMiddleware = function (req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth)
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        const [authType, authPayload] = auth.split(' ');
        if (authType !== 'Basic')
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        if (encodedData !== authPayload)
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        return next();
    }
    catch (e) {
        (0, console_1.log)('auth e', e);
    }
};
exports.authGuardMiddleware = authGuardMiddleware;
