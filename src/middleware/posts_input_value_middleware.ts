import { blogsRepositories } from './../repositories/blogs_repositories';
import { body } from "express-validator";

export const postTitleValidation = body("title")
  .isString()
  .trim()
  .notEmpty()
  .isLength({ min: 1, max: 30 })
  .withMessage("Title should be length from 1 to 30 symbols");

export const shortDescriptionTitleValidation = body("shortDescription")
  .isString()
  .trim()
  .notEmpty()
  .isLength({ min: 1, max: 100 })
  .withMessage("Short Description should be length from 1 to 100 symbols");

export const content = body("content")
  .isString()
  .trim()
  .notEmpty()
  .isLength({ min: 1, max: 1000 })
  .withMessage("content should be length from 1 to 100 symbols");

export const blogId = body("blogId")
  .isString()
  .notEmpty()
  .trim()
  .custom((id) => {
    const blogIsExist = blogsRepositories.findBlogId(id);
    if (!blogIsExist) {
      throw new Error("Blog not exist");
    }
    return true;
  })
  .withMessage("Invalid blogId");