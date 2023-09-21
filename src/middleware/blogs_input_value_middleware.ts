import { body} from "express-validator";

export const inputBlogsNameValidation = body("name")
  .isString()
  .notEmpty()
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