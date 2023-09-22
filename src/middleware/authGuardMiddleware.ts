import * as basicAuth from "express-basic-auth";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../utils";

export const authGuardMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.get("Authorization")) {
    const err = new Error("Not Authonticated");
    res
      .send(HTTP_STATUS.NOT_AUTHORIZATION_401)
      .set("WWW-Authenticate", "Basic");
    next(err);
  } else {
    let credentials = "admin:qwerty"
      .toString()
      .split(":");

    const username: string = credentials[0];
    const password: string = credentials[1];

    if (!(username === "admin" && password === "qwerty")) {
      const err = new Error("Not Authonticated");
      res
        .send(HTTP_STATUS.NOT_AUTHORIZATION_401)
        .set("WWw-Authonticate", "Basic");
      next(err);
    }
    res.status(HTTP_STATUS.OK_200);
    next();
  }
};

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
