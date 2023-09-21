import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const inputBlogsNameValidation = body("name")
  .isString()
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage("Name should be length from 1 to 15 symbols");
export const inputBlogsDescriptionValidation = body("description")
  .isString()
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Descriptionme should be length from 1 to 15 symbols");
export const inputBlogsWebsiteUrlValidation = body("websiteUrl")
  .isString()
  .trim()
  .isLength({ min: 1, max: 100 })
  .matches("^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$")
  .withMessage("Invalid websiteUrl");

export const inputBlogsValueMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
type ValidationError = {
  type: any;
  msg: string;
  path: string;
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
