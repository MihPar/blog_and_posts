import {ValueMiddleware} from '../middleware/validatorMiddleware'
import { HTTP_STATUS } from "./../utils";
import { Router, Request, Response } from "express";
import { blogs } from "../db/db_blogs";
import { blogsRepositories } from "../repositories/blogs_repositories";
import {
  inputBlogsDescriptionValidation,
  inputBlogsNameValidation,
  inputBlogsWebsiteUrlValidation,
} from "../middleware/blogs_input_value_middleware";
import { authGuardMiddleware } from "../middleware/authGuardMiddleware";

export const blogsRouter = Router({});

/************************************ get ***************************/

blogsRouter.get("/", function (req: Request, res: Response) {
  res.status(HTTP_STATUS.OK_200).send(blogs);
});

/************************************ post ***************************/

blogsRouter.post(
  "/",
  authGuardMiddleware,
  inputBlogsNameValidation,
  inputBlogsDescriptionValidation,
  inputBlogsWebsiteUrlValidation,
  ValueMiddleware,
  function (req: Request, res: Response) {
    const newBlog = blogsRepositories.createNewBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    // if (!newBlog) {
	// 	res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    // } else {
		return res.status(HTTP_STATUS.CREATED_201).send(newBlog);
    // }
  }
);

/************************************ get{id} ***************************/

blogsRouter.get("/:id", function (req: Request, res: Response) {
  const blog = blogsRepositories.findBlogId(req.params.id);
  if (!blog) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  } else {
    res.status(HTTP_STATUS.OK_200).send(blog);
  }
});

/************************************ put{id} ***************************/

blogsRouter.put(
  "/:id/",
  authGuardMiddleware,
  inputBlogsNameValidation,
  inputBlogsDescriptionValidation,
  inputBlogsWebsiteUrlValidation,
  ValueMiddleware,
  function (req: Request, res: Response) {
    const isUpdateBlog = blogsRepositories.updateBlog(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (!isUpdateBlog) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
		// const findBlog = blogsRepositories.findBlogId(req.params.id);
		res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

blogsRouter.delete("/:id", authGuardMiddleware, function (req: Request, res: Response) {
  const findBlog = blogsRepositories.deletedBlogId(req.params.id);
  if (!findBlog) {
	res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  } else {
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
});
