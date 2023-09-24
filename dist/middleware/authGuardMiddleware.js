"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuardMiddleware = void 0;
const utils_1 = require("../utils");
const console_1 = require("console");
// export const authGuardMiddleware = function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (!req.get("Authorization")) {
//     const err = new Error("Not Authonticated");
//     res
//       .send(HTTP_STATUS.NOT_AUTHORIZATION_401)
//       .set("WWW-Authenticate", "Basic");
//     next(err);
//   } else {
//     let credentials = "admin:qwerty"
//       .toString()
//       .split(":");
//     const username: string = credentials[0];
//     const password: string = credentials[1];
//     if (!(username === "admin" && password === "qwerty")) {
//       const err = new Error("Not Authonticated");
//       res
//         .send(HTTP_STATUS.NOT_AUTHORIZATION_401)
//         .set("WWw-Authonticate", "Basic");
//       next(err);
//     }
//     res.status(HTTP_STATUS.OK_200);
//     next();
//   }
// };
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
