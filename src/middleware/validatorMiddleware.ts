import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUS } from "../utils";

export type ValidationError = {
	type: any;
	msg: string;
	path: string;
  };
  

export const ValueMiddleware = function(
	req: Request,
	res: Response,
	next: NextFunction
  ) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	  const errorMessage = errors.array({onlyFirstError: true}).map(errorFormater)
	  res.status(HTTP_STATUS.BAD_REQUEST_400).send(errorMessage)
	  return 
	} else {
	  next();
	}
  };
  
  export const errorFormater = (error: ValidationError) => {
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
  