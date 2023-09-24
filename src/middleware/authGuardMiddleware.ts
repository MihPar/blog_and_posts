import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../utils";
import { log } from "console";

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
