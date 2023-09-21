import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../utils";

const expectAuthHeader = "admin:qwerty";

export const authGuardMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Basic ")
  ) {
    res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    return;
  }
  const splitHeader = req.headers.authorization.split(" ")[1]
  const enCodeHeader = atob(splitHeader)
  if(enCodeHeader !== splitHeader) {
	res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
  }
  next()
};
