import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../utils";
import { log } from "console";

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
const encodedData = Buffer.from(expectAuthHeader).toString('base64')

export const authGuardMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
	try{
		const auth = req.headers.authorization
		if(!auth) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
		const [authType, authPayload] = auth.split(' ')
		if(authType !== 'Basic') return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
		if(encodedData !== authPayload) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
		  return next()
	}
	catch(e){
		log('auth e', e)
	}
  
};
