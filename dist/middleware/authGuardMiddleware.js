"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuardMiddleware = void 0;
const utils_1 = require("../utils");
const authGuardMiddleware = function (req, res, next) {
    if (!req.get("Authorization")) {
        const err = new Error("Not Authonticated");
        res
            .send(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401)
            .set("WWW-Authenticate", "Basic");
        next(err);
    }
    else {
        let credentials = "admin:qwerty"
            .toString()
            .split(":");
        const username = credentials[0];
        const password = credentials[1];
        if (!(username === "admin" && password === "qwerty")) {
            const err = new Error("Not Authonticated");
            res
                .send(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401)
                .set("WWw-Authonticate", "Basic");
            next(err);
        }
        res.status(utils_1.HTTP_STATUS.OK_200);
        next();
    }
};
exports.authGuardMiddleware = authGuardMiddleware;
// const expectAuthHeader = "admin:qwerty";
// export const authGuardMiddleware = function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith("Basic ")
//   ) {
//     res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
//     return;
//   }
//   const splitHeader = req.headers.authorization.split(" ")[1]
//   const enCodeHeader = atob(splitHeader)
//   if(enCodeHeader !== splitHeader) {
// 	res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
//   }
//   next()
// };
