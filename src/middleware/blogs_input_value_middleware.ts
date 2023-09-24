import { body} from "express-validator";

export const inputBlogsNameValidation = body("name")
  .isString()
  .withMessage("1")
  .notEmpty()
  .withMessage("2")
  .trim()
  .withMessage("3")
  .isLength({ min: 1, max: 15 })
  .withMessage("Name should be length from 1 to 15 symbols");
export const inputBlogsDescriptionValidation = body("description")
  .isString()
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage("Descriptionme should be length from 1 to 15 symbols");
export const inputBlogsWebsiteUrlValidation = body("websiteUrl")
  .isString()
  .trim()
  .isLength({ min: 1, max: 100 })
  .isURL()
  .withMessage("Invalid websiteUrl");